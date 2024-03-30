import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  userLogin(formData) {
    const url = 'user/login/';
    return this.http.post(url, formData);
  }

  userSignUp(formData) {
    const url = 'user/profile/';
    return this.http.post(url, formData);
  }

  getUserProfile(id) {
    const url = `user/profile/${id}`;
    return this.http.get(url);
  }
  
  getUserList(search = '') {
    const url = `user/profile/?search=${search}`;
    return this.http.get(url);
  }

  updateProfile(id, formData) {
    const url = `user/profile/${id}`;
    return this.http.patch(url, formData);
  }

  getReportList(search = '', page) {
    console.log(search)
    const url = `detect/predict/?search=${search}&page=${page}`;
    return this.http.get(url);
  }

  predictImage(data) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'multipart/form-data');

    const url = 'detect/predict/';
    return this.http.post(url, data, {headers: headers});
  }

  reportImage(data) {
    const url = 'detect/predict/'
    return this.http.patch(url, data);
  }

  sendMessage(message) {
    const url = 'user/message/';
    return this.http.post(url, message);
  }

  getUserMessages(search = '') {
    const url = `user/message/?search=${search}`;
    return this.http.get(url);
  }

  replyUserMessage(message) {
    const url = `user/message/`;
    return this.http.patch(url, message);
  }

}
