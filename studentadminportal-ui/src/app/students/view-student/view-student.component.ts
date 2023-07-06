import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: '',
    profileImageUrl: '',
    genderId: '',
    gender: {
      genderId: '',
      description:''
    },
    address: {
      id:'',
      physicalAddress: '',
      postalAddress: ''
    }
  };

  isNewStudent = false;
  header ='';

  genderList: Gender[] = [];
constructor(private readonly studentService: StudentService, 
  private readonly route: ActivatedRoute,
  private readonly genderService: GenderService,
  private snackBar: MatSnackBar,
  private router: Router){}
  
  ngOnInit(): void {
this.route.paramMap.subscribe(
  (params)=> {
   this.studentId= params.get('id');

   if (this.studentId) {
      if (this.studentId.toLowerCase() === 'Add'.toLowerCase()) {
        this.isNewStudent = true;
        this.header = 'Add New Student';
      }
      else{
        this.isNewStudent = false;
        this.header = 'Edit Student';
        this.studentService.getStudent(this.studentId)
          .subscribe(
            (successResponse) => {
              this.student = successResponse;
              console.log(this.student);
              },       
            (errorResponse) => {
              console.log(errorResponse);
            }
          );
      }

    

      this.genderService.getGenderList()
      .subscribe(
        (successResponse) => {
         this.genderList= successResponse;
         console.log(this.genderList);
          },       
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
   }
  }
);
  }
  Update(): void{
    this.studentService.updateStudent(this.student.id, this.student)
    .subscribe(
      (successResponse) => {
        console.log(successResponse);
        this.snackBar.open('Student updated successfully', undefined, {
          duration: 2000
        });
        },       
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  Delete(): void{
    this.studentService.deleteStudent(this.student.id)
    .subscribe(
      (successResponse) => {
        this.snackBar.open('Student deleted successfully', undefined, {
          duration: 2000
        });
        setTimeout(() => {
          this.router.navigateByUrl('Students');
        }, 2000);
        },       
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  Add(): void{
    this.studentService.addStudent(this.student)
    .subscribe(
      (successResponse)=>{
        console.log(successResponse);
        this.snackBar.open('Student Added Successfully', undefined, {
          duration: 2000
        });
        setTimeout(() => {
          this.router.navigate(['Students/' , successResponse.id]);
        }, 2000);
        }, 
      (errorResponse)=>{
        console.log(errorResponse);
      }
    )
  }
}
