import { Injectable } from '@angular/core';
import { RegistrationPDF, VerificationDModel, Response } from './copyright-app.sdk';
import { PDFDocument, StandardFonts, PDFRawStream } from 'pdf-lib';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ReportingService {
    constructor(private httpClient: HttpClient) { }

    downloadCertificate(reg: RegistrationPDF): void {
        let copyRightLn1 = 'This Certificate bears witness that the above file existed and was in the possession of';
        let copyRightLn2 = ' at the time of registration.';
        let copyRightLn3 = 'For more information: www.promena.in';
        let copyRightLn4 = 'To check the blockchain: chain.nem.ninja';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let _options: any = {
            headers: headers,
            responseType: 'blob'
        };

        this.httpClient.get<Blob>('/assets/pdf/template.pdf', _options).subscribe((data: any) => {
            let reader = new FileReader();
            reader.onload = (event: any) => {
                // template = event.target.result as ArrayBuffer;
                // console.log(template);
                PDFDocument.load(event.target.result as ArrayBuffer).then(pdfDoc => {
                    // Embed the Helvetica font
                    pdfDoc.embedFont(StandardFonts.Helvetica).then(helveticaFont => {
                        // Get the first page of the document
                        const pages = pdfDoc.getPages();
                        const page = pages[0];
                        // Get the width and height of the first page
                        const { width, height } = page.getSize();
                        // File Name
                        let y = 500;
                        page.drawText('Filename', {
                            font: helveticaFont,
                            x: this.x(width, helveticaFont.widthOfTextAtSize('Filename', 11)),
                            y: y,
                            size: 11
                        });
                        y -= helveticaFont.heightAtSize(25);
                        let text = reg.fileName;
                        const maxWidth = width - 16;
                        // while file name is too big
                        while (helveticaFont.widthOfTextAtSize(text, 13) > maxWidth) {
                            let textWidth = helveticaFont.widthOfTextAtSize(text, 13);
                            const percent = textWidth / maxWidth;
                            const len = Math.floor(text.length / percent);
                            const textToWrite = text.substr(0, len);
                            text = text.substring(len, text.length);
                            page.drawText(textToWrite, {
                                font: helveticaFont,
                                size: 13,
                                x: this.x(width, helveticaFont.widthOfTextAtSize(textToWrite, 13)),
                                y: y
                            });
                            y -= helveticaFont.heightAtSize(13);
                        }
                        page.drawText(text, {
                            font: helveticaFont,
                            size: 13,
                            x: this.x(width, helveticaFont.widthOfTextAtSize(text, 13)),
                            y: y
                        });
                        // Transaction Hash
                        y = 420;
                        page.drawText('Transaction Hash', {
                            font: helveticaFont,
                            size: 11,
                            x: this.x(width, helveticaFont.widthOfTextAtSize('Transaction Hash', 11)),
                            y: y
                        });
                        y -= helveticaFont.heightAtSize(25);
                        page.drawText(reg.hash, {
                            font: helveticaFont,
                            size: 16,
                            x: this.x(width, helveticaFont.widthOfTextAtSize(reg.hash, 16)),
                            y: y
                        });
                        // add Date
                        y = 200;
                        page.drawText(reg.createdDateTime.toUTCString(), {
                            font: helveticaFont,
                            size: 20,
                            x: this.x(width, helveticaFont.widthOfTextAtSize(reg.createdDateTime.toUTCString(), 20)),
                            y: y
                        });
                        y = 80;
                        page.drawText(copyRightLn1, {
                            font: helveticaFont,
                            size: 11,
                            x: this.x(width, helveticaFont.widthOfTextAtSize(copyRightLn1, 11)),
                            y: y
                        });
                        y -= helveticaFont.heightAtSize(11);
                        const str = reg.email + copyRightLn2;
                        page.drawText(str, {
                            font: helveticaFont,
                            size: 11,
                            x: this.x(width, helveticaFont.widthOfTextAtSize(str, 11)),
                            y: y
                        });
                        y -= helveticaFont.heightAtSize(11);
                        page.drawText(copyRightLn3, {
                            font: helveticaFont,
                            size: 11,
                            x: this.x(width, helveticaFont.widthOfTextAtSize(copyRightLn3, 11)),
                            y: y
                        });
                        y -= helveticaFont.heightAtSize(11);
                        page.drawText(copyRightLn4, {
                            font: helveticaFont,
                            size: 11,
                            x: this.x(width, helveticaFont.widthOfTextAtSize(copyRightLn4, 11)),
                            y: y
                        });
                        // Serialize the PDFDocument to bytes (a Uint8Array)
                        pdfDoc.save().then(pdfBytes => {
                            let file = new Blob([pdfBytes], { type: 'application/pdf' });
                            var link = document.createElement('a');
                            link.href = window.URL.createObjectURL(file);
                            link.download = reg.fileName.substring(0, reg.fileName.lastIndexOf('.')) + '.pdf';
                            link.click();
                        });
                    });
                });
            };
            reader.readAsArrayBuffer(data as Blob);
        })
    }
    downloadVerificationCertificate(reg: VerificationDModel): void {
        let copyRightLn1 = 'This Certificate bears witness that the above file existed and was in the possession of';
        let copyRightLn2 = ' at the time of registration.';
        let copyRightLn3 = 'For more information: www.promena.in';
        let copyRightLn4 = 'To check the blockchain: chain.nem.ninja';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let _options: any = {
            headers: headers,
            responseType: 'blob'
        };

        this.httpClient.get<Blob>('/assets/pdf/template.pdf', _options).subscribe((data: any) => {
            let reader = new FileReader();
            reader.onload = (event: any) => {
                // template = event.target.result as ArrayBuffer;
                // console.log(template);
                PDFDocument.load(event.target.result as ArrayBuffer).then(pdfDoc => {
                    // Embed the Helvetica font
                    pdfDoc.embedFont(StandardFonts.Helvetica).then(helveticaFont => {
                        // Get the first page of the document
                        const pages = pdfDoc.getPages();
                        const page = pages[0];
                        // Get the width and height of the first page
                        const { width, height } = page.getSize();
                        // File Name
                        let y = 500;
                        page.drawText('Filename', {
                            font: helveticaFont,
                            x: this.x(width, helveticaFont.widthOfTextAtSize('Filename', 11)),
                            y: y,
                            size: 11
                        });
                        y -= helveticaFont.heightAtSize(25);
                        let text = reg.fileName;
                        const maxWidth = width - 16;
                        // while file name is too big
                        while (helveticaFont.widthOfTextAtSize(text, 13) > maxWidth) {
                            let textWidth = helveticaFont.widthOfTextAtSize(text, 13);
                            const percent = textWidth / maxWidth;
                            const len = Math.floor(text.length / percent);
                            const textToWrite = text.substr(0, len);
                            text = text.substring(len, text.length);
                            page.drawText(textToWrite, {
                                font: helveticaFont,
                                size: 13,
                                x: this.x(width, helveticaFont.widthOfTextAtSize(textToWrite, 13)),
                                y: y
                            });
                            y -= helveticaFont.heightAtSize(13);
                        }
                        page.drawText(text, {
                            font: helveticaFont,
                            size: 13,
                            x: this.x(width, helveticaFont.widthOfTextAtSize(text, 13)),
                            y: y
                        });
                        // Transaction Hash
                        y = 420;
                        page.drawText('Transaction Hash', {
                            font: helveticaFont,
                            size: 11,
                            x: this.x(width, helveticaFont.widthOfTextAtSize('Transaction Hash', 11)),
                            y: y
                        });
                        y -= helveticaFont.heightAtSize(25);
                        page.drawText(reg.hash, {
                            font: helveticaFont,
                            size: 16,
                            x: this.x(width, helveticaFont.widthOfTextAtSize(reg.hash, 16)),
                            y: y
                        });
                        // add Date
                        y = 300;
                        page.drawText(reg.registrationDate.toUTCString(), {
                            font: helveticaFont,
                            size: 20,
                            x: this.x(width, helveticaFont.widthOfTextAtSize(reg.registrationDate.toUTCString(), 20)),
                            y: y
                        });
                        y = 200;
                        page.drawText(reg.verificationDate.toUTCString(), {
                            font: helveticaFont,
                            size: 20,
                            x: this.x(width, helveticaFont.widthOfTextAtSize(reg.verificationDate.toUTCString(), 20)),
                            y: y
                        });
                        y = 80;
                        page.drawText(copyRightLn1, {
                            font: helveticaFont,
                            size: 11,
                            x: this.x(width, helveticaFont.widthOfTextAtSize(copyRightLn1, 11)),
                            y: y
                        });
                        y -= helveticaFont.heightAtSize(11);
                        const str = reg.email + copyRightLn2;
                        page.drawText(str, {
                            font: helveticaFont,
                            size: 11,
                            x: this.x(width, helveticaFont.widthOfTextAtSize(str, 11)),
                            y: y
                        });
                        y -= helveticaFont.heightAtSize(11);
                        page.drawText(copyRightLn3, {
                            font: helveticaFont,
                            size: 11,
                            x: this.x(width, helveticaFont.widthOfTextAtSize(copyRightLn3, 11)),
                            y: y
                        });
                        y -= helveticaFont.heightAtSize(11);
                        page.drawText(copyRightLn4, {
                            font: helveticaFont,
                            size: 11,
                            x: this.x(width, helveticaFont.widthOfTextAtSize(copyRightLn4, 11)),
                            y: y
                        });
                        // Serialize the PDFDocument to bytes (a Uint8Array)
                        pdfDoc.save().then(pdfBytes => {
                            let file = new Blob([pdfBytes], { type: 'application/pdf' });
                            var link = document.createElement('a');
                            link.href = window.URL.createObjectURL(file);
                            link.download = reg.fileName.substring(0, reg.fileName.lastIndexOf('.'));
                            link.click();
                        });
                    });
                });
            };
            reader.readAsArrayBuffer(data as Blob);
        })
    }


    private x(width: number, textWidth: number): number {
        return (width / 2) - (textWidth / 2);
    }

    registerMultiple(formData: FormData): Observable<Response> {
        return this.httpClient.post<Response>(environment.api + '/api/CopyRight/RegisterMultiple', formData, {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('token')
            })
        });
    }

}