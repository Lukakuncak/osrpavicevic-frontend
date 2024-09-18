import { Component, OnInit } from '@angular/core';
import { FilesService } from '../service/files.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-important-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './important-documents.component.html',
  styleUrl: './important-documents.component.css'
})
export class JavneNabavkeComponent implements OnInit {
  filenames: string[] = [];
  selectedFile: File | null = null;
  isAdmin: boolean = false;
  rootFile: string = "javne-nabavke";
  token: string;

  constructor(private pdfService: FilesService, private authService: AuthService) { }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
    this.loadFiles();
    this.checkAdminStatus();
  }

  loadFiles() {
    this.pdfService.getPdfFiles(this.rootFile).then(files => {
      this.filenames = files;
    });
  }

  checkAdminStatus() {
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  downloadFile(filename: string) {
    this.pdfService.downloadPdf(this.rootFile,filename);
  }

  previewFile(filename: string) {
    this.pdfService.previewPdf(this.rootFile,filename);
  }

  deleteFile(filename: string) {
    if (confirm(`Да ли сте сигурни да желите да обришете фајл ${filename}?`)) {
      this.pdfService.deletePdf(this.rootFile,filename,this.token).then(() => {
        this.loadFiles();
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      this.pdfService.uploadPdf(this.rootFile, this.selectedFile,this.token).then(() => {
        this.loadFiles();
        this.selectedFile = null;
      });
    }
  }
}