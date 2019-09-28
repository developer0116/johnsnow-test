import { Injectable } from '@angular/core';
​
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { scan } from 'rxjs/internal/operators/scan';
import { map, take } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
​
interface QueryConfig {
  path: string; //  path to collection
  field: string; // field to orderBy
  limit: number; // limit per query
  reverse: boolean; // reverse order?
  prepend: boolean; // prepend to source?
}
​
@Injectable({
  providedIn: 'root'
})
export class PaginationService {
​
  // Source data
  private $done = new BehaviorSubject(false);
  private $loading = new BehaviorSubject(false);
  private $data = new BehaviorSubject([]);
  private $dataSnapShot = [];
​
  private query: QueryConfig;
​
  // Observable data
  data: Observable<any> = this.$done.asObservable();
  done: Observable<boolean> = this.$done.asObservable();
  loading: Observable<boolean> = this.$loading.asObservable();
​
​
  constructor(private afs: AngularFirestore) { }
​
  // Initial query sets options and defines the Observable
  // passing opts will override the defaults
  init(path: string, field: string, opts?: any, whereClause?) {
    this.query = {
      path,
      field,
      limit: 5,
      reverse: false,
      prepend: false,
      ...opts
    };
​
    const getInitialData = this.afs.collection(this.query.path, ref => {
      if (whereClause) {
        return ref
          .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
          .limit(this.query.limit)
          .where(whereClause.property, whereClause.condition, whereClause.value);
      } else {
        return ref
          .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
          .limit(this.query.limit);
      }
    });
    this.mapAndUpdate(getInitialData);
​
    // Create the observable array for consumption in components
    this.data = this.$data.asObservable()
      .pipe(
        scan((acc, val) => {
          return this.query.prepend ? val.concat(acc) : acc.concat(val);
        })
      );
  }
​
  // Retrieves additional data from firestore
  more(whereClause?) {
    const cursor = this.getCursor();
    const more = this.afs.collection(this.query.path, ref => {
      if (whereClause) {
        return ref
          .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
          .limit(this.query.limit)
          .where(whereClause.property, whereClause.condition, whereClause.value)
          .startAfter(cursor);
      } else {
        return ref
          .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
          .limit(this.query.limit)
          .startAfter(cursor);
      }
    });
    this.mapAndUpdate(more);
  }
​
​
  // Determines the doc snapshot to paginate query
  private getCursor() {
    const current = this.$dataSnapShot;
    if (current.length) {
      return this.query.prepend ? current[0] : current[current.length - 1];
    }
    return null;
  }
​
​
  // Maps the snapshot to usable format the updates source
  private mapAndUpdate(col: AngularFirestoreCollection<any>) {
​
    if (this.$done.value || this.$loading.value) { return; }
​
    // loading
    this.$loading.next(true);
​

    // Map snapshot with doc ref (needed for cursor)
    col.snapshotChanges()
      .pipe(
        take(1),
        map(arr => {
          this.$dataSnapShot = arr.map(snap => snap.payload.doc);
          this.$dataSnapShot = this.query.prepend ? this.$dataSnapShot.reverse() : this.$dataSnapShot;
        })
      )
      .subscribe();
​
    return col.valueChanges()
      .pipe(
        take(1)
      )
      .subscribe((values) => {
        if (!values.length) {
          this.$done.next(true);
        }
         // If prepending, reverse the batch order
        values = this.query.prepend ? values.reverse() : values;
​
        values.map((verse, index) => verse.id = this.$dataSnapShot[index].id);
        // update source with new values, done loading
        this.$data.next(values);
        this.$loading.next(false);
      });
  }
​
  resetPagination() {
    this.$loading.next(false);
    this.$done.next(false);
    this.$data.next([]);
    this.$dataSnapShot = [];
  }
}
