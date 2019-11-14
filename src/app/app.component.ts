import { Component,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  @ViewChild('canvas', {static: true}) canvas: ElementRef;
  @ViewChild('svg', {static: true}) svg: ElementRef;
  name = 'Angular';
  context;
  drawInlineSVG(svgElement, ctx, callback){
    
    let canvas = this.canvas.nativeElement;
    ctx = canvas.getContext("2d");
  var svgURL = new XMLSerializer().serializeToString(svgElement);
  var img  = new Image();
  img.onload = function(){
    ctx.drawImage(this, 0,0);
    callback();
    }
  img.src = 'data:image/svg+xml; charset=utf8, '+encodeURIComponent(svgURL);
  }
printCanvas(dataUrl)  
{  
    // var dataUrl = document.getElementById('anycanvas').toDataURL(); //attempt to save base64 string to server using this var  
    var windowContent = '<!DOCTYPE html>';
    windowContent += '<html>'
    windowContent += '<head><title>Print canvas</title></head>';
    windowContent += '<body>'
    windowContent += '<img src="' + dataUrl + '">';
    windowContent += '</body>';
    windowContent += '</html>';
    // console.log(windowContent)
    var printWin = window.open('','','width=340,height=260');
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.focus();
    printWin.print();
    printWin.close();
}
//usage :
  click(){
    let canvas = this.canvas.nativeElement;
    this.context = canvas.getContext("2d");
    this.drawInlineSVG(this.svg.nativeElement, canvas, () =>{this.printCanvas(canvas.toDataURL())})
  }
}
