import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-visor',
    templateUrl: './visor.component.html',
    styleUrls: ['./visor.component.scss']
})
export class VisorComponent implements OnInit {
    pdfSrc = "http://localhost:4000/public/pdf/1657254593267.pdf"
    page = 1;
    zoom = 0.98; // default initial zoom value
    zoomMax = 2; // max zoom value
    zoomMin = 0.5; // min zoom value
    zoomAmt = 0.2; // stepping zoom values on button click
    zoomScale = "page-width"; // zoom scale based on the page-width
    totalPages = 0; // indicates the total number of pages in the pdf document

    constructor(private activatedRoute: ActivatedRoute) { }
    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.pdfSrc = params['url'] || "";
        });
    }

    // zoom functionality for the pdf viewer
    setZoom(type: string): void {
        console.log(type);
        if (type === "increment") {
            this.zoom += this.zoomAmt;
        } else if (type === "decrement") {
            this.zoom -= this.zoomAmt;
        }
    }
}
