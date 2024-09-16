import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private BASE_URL = "http://localhost:8080";

  constructor() { }

  async getPdfFiles(rootFile: string): Promise<string[]> {
    const response = await axios.get(`${this.BASE_URL}/public/pdf/list-all/${rootFile}`);
    return response.data.filenames;
  }

  async downloadPdf(rootFile: string, filename: string) {
    const response = await axios.get(`${this.BASE_URL}/public/pdf/download/${rootFile}/${filename}`, {
      responseType: 'blob'
    });

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
  }

  async previewPdf(rootFile: string, filename: string) {
    const response = await axios.get(`${this.BASE_URL}/public/pdf/download/${rootFile}/${filename}`, {
      responseType: 'blob'
    });
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    window.open(url);
  }

  async deletePdf(rootFile: string, filename: string, token: string) {
    await axios.delete(`${this.BASE_URL}/pdf/delete/${rootFile}/${filename}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  async uploadPdf(rootFile: string, file: File, token: string) {
    const formData = new FormData();
    formData.append('file', file);

    await axios.post(`${this.BASE_URL}/pdf/upload/${rootFile}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
  }

}
