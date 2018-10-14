import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFirestore } from 'angularfire2/firestore';
import { combineLatest, defer, Observable, Observer } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { ApiService } from './api.service';

@Injectable()
export class CourseService {

	private courseCurrent: Subject<any> = new BehaviorSubject<any>(null);
	public $courseCurrent = this.courseCurrent.asObservable();

    constructor(
        private api: ApiService,
        private firestore: AngularFirestore
    ) { }

    public getCourses(): Observable<any>{
    	return new Observable((observer) => {
    		let courses_complete = [];
	    	this.firestore.collection('cursos', ref => ref.orderBy('fecha_registro', 'asc')).snapshotChanges()
	    	.subscribe((courses: any) => {
	    		courses.map(async (course: any) => {
			        let item = course.payload.doc.data();
			        let course_structure = { id: course.payload.doc.id, ...item, lecciones: [] };
			        item.lecciones.map(async (lec: any) => {
			          let res = await lec.get();
			          course_structure.lecciones.push({ id: res.id, ...res.data() });
			        });
			        courses_complete.push(course_structure);
			    });
			    observer.next(courses_complete);
			    observer.complete();
	    	});
    	});
    }

    public getCourseById(id: string){
    	return new Observable((observer) => {
    		let data_parse: any;
	    	this.firestore.doc(`cursos/${ id }`).snapshotChanges()
	    	.subscribe((course: any) => {
	    		data_parse = { id: course.payload.id, ...course.payload.data() }
			    observer.next(data_parse);
			    observer.complete();
	    	});
    	});
    }

    public setCourseCurrent(course: any){
    	this.courseCurrent.next(course);
    }
}