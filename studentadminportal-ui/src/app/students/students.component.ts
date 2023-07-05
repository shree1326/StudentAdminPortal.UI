import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from '../models/ui-models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students : Student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender', 'edit'];
dataSource: MatTableDataSource<Student> = new  MatTableDataSource<Student>();
@ViewChild(MatPaginator) matPaginator!: MatPaginator;
@ViewChild(MatSort) matSort!: MatSort;
filterString = '';
  constructor(private studentService: StudentService) {}
    ngOnInit(): void {
      //Fetch Students
      this.studentService.getAllStudents()
      .subscribe(
        (successResponse) => {
          this.students = successResponse;
          this.dataSource = new MatTableDataSource<Student>(this.students);
          if (this.matPaginator) {
            this.dataSource.paginator = this.matPaginator;
            this.dataSource.sort = this.matSort; 
          }
          if (this.matSort) {
            this.dataSource.sort = this.matSort; 
          }
          console.log(this.students[0]);
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
    }
    filterStudents(){
      this.dataSource.filter = this.filterString.trim().toLowerCase();
    }
}
