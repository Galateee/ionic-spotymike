// src/app/upload/upload.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UploadService } from 'src/app/core/services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  standalone: true,
  imports: [ CommonModule
  ]
})
export class UploadComponent {
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  constructor(private uploadService: UploadService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedFile) {
      this.uploadService.uploadFile(this.selectedFile).subscribe({
        next: (url) => {
          this.imageUrl = url;
          console.log(url);
          
        },
        error: (error) => {
          console.error('Upload failed', error);
        }
      });
    }
  }
}
