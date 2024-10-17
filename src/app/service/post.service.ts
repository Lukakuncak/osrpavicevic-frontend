import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, from } from 'rxjs';
import { Post, PostPage } from '../model/post';
import { PostType } from '../model/post-type.enum';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:8080';

  constructor() { }

  createPost(title: string, content: string, type: string, token: string): Observable<any> {
    const newsCreateRequest = {
      title: title,
      content: content,
      type: type
    };
    return from(axios.post(`${this.baseUrl}/post/create`, newsCreateRequest, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    );
  }

  getAllPostTypes(): Observable<string[]> {
    return from(axios.get(`${this.baseUrl}/public/post/get-all-types`).then(response => response.data));
  }

  getAllRoditeljiPosts(page: number, size: number, sortBy: string, sortDir: string, searchTerm: string): Observable<PostPage> {
    return from(
      axios.get(`${this.baseUrl}/public/post/get-all-roditelji`, {
        params: {
          page: page.toString(),
          size: size.toString(),
          search: searchTerm,
          sortBy: sortBy,
          sortDir: sortDir
        }
      }).then(response => response.data.postPage)
    );
  }

  getAllUceniciPosts(page: number, size: number, sortBy: string, sortDir: string, searchTerm: string): Observable<PostPage> {
    return from(
      axios.get(`${this.baseUrl}/public/post/get-all-ucenici`, {
        params: {
          page: page.toString(),
          size: size.toString(),
          search: searchTerm,
          sortBy: sortBy,
          sortDir: sortDir
        }
      }).then(response => response.data.postPage)
    );
  }



  async deletePost(id: number, token: string) {
    await axios.put(`${this.baseUrl}/post/delete/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }


  getSinglePost(id: number): Promise<Post> {
    return axios.get(`${this.baseUrl}/public/post/${id}`)
      .then(response => {
        if (response.status === 200) {
          return response.data.post;
        } else {
          console.error(response.data.error);
          throw new Error(response.data.error);
        }
      })
      .catch(error => {
        console.error("Happened an error during the post fetching: ", error);
        throw error;
      });
  }


  async updatePostContent(id: number, content: string, token: string): Promise<Post> {
    try {
      const response = await axios.put(`${this.baseUrl}/post/edit-content/${id}`, { content: content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.statusCode === 200) {
        return response.data.post;
      } else {
        console.log(response.data.error);
        return {
          id: 0,
          title: "",
          content: "",
          type: PostType.RODITELJI,
          dateTime: "9/20/24 00:00",
          deleted: false
        };
      }
    } catch (error) {
      console.log(error);
      return {
        id: 0,
        title: "",
        content: "",
        type: PostType.RODITELJI,
        dateTime: "9/20/24 00:00",
        deleted: false
      };
    }
  }

  async uploadNewsImage(id: number, formData: FormData, token: string): Promise<Post> {
    try {
      const response = await axios.put(`${this.baseUrl}/post/add-picture/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.statusCode === 200) {
        return response.data.news;
      } else {
        console.log(response.data.error);
        return {
          id: 0,
          title: "",
          content: "",
          type: PostType.RODITELJI,
          dateTime: "9/20/24 00:00",
          deleted: false
        };
      }
    } catch (error) {
      console.log(error);
      return {
        id: 0,
        title: "",
        content: "",
        type: PostType.RODITELJI,
        dateTime: "9/20/24 00:00",
        deleted: false
      };
    }
  }

  async deletePicture(id: number, token: string): Promise<Post> {
    try {
      const response = await axios.put(`${this.baseUrl}/post/remove-picture/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.statusCode === 200) {
        return response.data.news;
      } else {
        console.log(response.data.error);
        return {
          id: 0,
          title: "",
          content: "",
          type: PostType.RODITELJI,
          dateTime: "9/20/24 00:00",
          deleted: false
        };
      }
    } catch (error) {
      console.log(error);
      return {
        id: 0,
        title: "",
        content: "",
        type: PostType.RODITELJI,
        dateTime: "9/20/24 00:00",
        deleted: false
      };
    }
  }

  async uploadFile(id: number, file: File, token: string) {
    const formData = new FormData();
    formData.append('multipartFile', file);

    await axios.put(`${this.baseUrl}/post/add-file/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async deleteFile(id: number, token: string) {
    await axios.delete(`${this.baseUrl}/post/delete-file/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  async previewFile(id: number) {
    try {
      // Fetch the file from your backend (ensure this endpoint provides public access)
      const response = await axios.get(`${this.baseUrl}/public/post/download/${id}`, { responseType: 'blob' });
      const contentType = response.headers['content-type'];

      // PowerPoint file types
      if (contentType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || contentType === 'application/vnd.ms-powerpoint') {
        const fileUrl = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));

        // Use Office Online Viewer for PPTX preview
        const iframe = document.createElement('iframe');
        iframe.src = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
        iframe.width = '100%';
        iframe.height = '600px';
        iframe.style.border = 'none';

        // Clear previous file preview and append the new one
        const previewContainer = document.getElementById('file-preview');
        previewContainer.innerHTML = ''; // Clear previous preview
        previewContainer.appendChild(iframe);
      } else {
        console.log('Preview not supported for this file type.');
      }
    } catch (error) {
      console.error('Error previewing file:', error);
    }
  }

  async getFileUrl(postId: number): Promise<{ url: string }> {
    const response = await axios.get(`${this.baseUrl}/public/post/download/${postId}`);
    return response.data; // Ensure this contains the URL to the PPTX file
  }
  



  async downloadFile(id: number, title: string) {
    const response = await axios.get(`${this.baseUrl}/public/post/download/${id}`, {
      responseType: 'blob'
    });

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', title);
    document.body.appendChild(link);
    link.click();
  }
}
