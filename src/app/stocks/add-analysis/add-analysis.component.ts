import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-analysis',
  templateUrl: './add-analysis.component.html',
  styleUrls: ['./add-analysis.component.scss']
})
export class AddAnalysisComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  saveMode = false;
  dummyImage = 'https://penserra.com/wp-content/uploads/2018/03/dummy-post-square-1-300x300-150x150.jpg';
  items = ['Zacks Research', 'Yahoo Finance', 'Money Control', 'Other', '']
  constructor(private _formBuilder: FormBuilder, private router: Router) {}
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      subtitle: [''],
      imageurl: [''],
      source: ['', Validators.required],
      postedDate: [new Date()],
      ref: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      description: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  saveData(){
    this.saveMode = true;
    console.log("The first form group values is:" , this.firstFormGroup);
    console.log("The second form group values is:" , this.secondFormGroup);
    let dataStore = window.sessionStorage.getItem('posts') ? JSON.parse(window.sessionStorage.getItem('posts')) : [];
    
    let newPostObj = {...this.firstFormGroup.value, ...this.secondFormGroup.value};
    if(newPostObj.imageurl === '')
      newPostObj.imageUrl = this.dummyImage;
    dataStore.push(newPostObj);
    window.sessionStorage.setItem('posts', JSON.stringify(dataStore));
   
  }

  navigateHomePage(){
    this.router.navigate(['/home']);
  }
}
