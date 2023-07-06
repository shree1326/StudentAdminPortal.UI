import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/update-student-request.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseApiUrl = 'https://localhost:44395';
  constructor(private httpClient: HttpClient) { }
  getAllStudents(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/Student');
  }
  getStudent(studentId : string): Observable<Student>{
    return this.httpClient.get<Student>(this.baseApiUrl + '/Student/' + studentId);
  }

  updateStudent(studentId : string, studentRequest: Student):Observable<Student>{
    const UpdateStudentRequest : UpdateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      GenderId: studentRequest.gender.genderId,
      PhysicalAddress: studentRequest.address.physicalAddress,
      PostalAddress: studentRequest.address.postalAddress,
    }
    return this.httpClient.put<Student>(this.baseApiUrl + '/Student/' + studentId, UpdateStudentRequest);
  }

  deleteStudent(studentId: string):Observable<Student>{
    return this.httpClient.delete<Student>(this.baseApiUrl + '/Student/' + studentId);
  }
}
