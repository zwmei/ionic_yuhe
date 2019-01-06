import { HttpNetwork } from "./http";
import { Injectable } from "@angular/core";

@Injectable()
export class ClassNetwork {

  constructor(private http: HttpNetwork) {
  }
  getClassList() {
    return this.http.get('/app/classManagement/getClassInforns');
  }
  getClassDetail(data) {
    return this.http.get('/app/classManagement/getClassInforns', data);
  }
  getClassStudents(data) {
    return this.http.get('/app/classManagement/getChildrenInfos', data);
  }
  getStudentDetail(data) {
    return this.http.get('/app/classManagement/getChildDetail', data);
  }
}
