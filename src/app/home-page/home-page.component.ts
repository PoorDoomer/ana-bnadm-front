import { Component, OnInit, HostListener } from '@angular/core';

interface BackgroundImage {
  src: string;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  side: 'left' | 'right';
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  titleImage = 'assets/title.png';
  backgroundImages: BackgroundImage[] = [
    {src: 'assets/background/pic1 (1).png', x: 0, y: 0, speedX: 0, speedY: 0, side: 'left'},
    {src: 'assets/background/pic1 (2).png', x: 0, y: 0, speedX: 0, speedY: 0, side: 'right'},
    {src: 'assets/background/pic1 (3).png', x: 0, y: 0, speedX: 0, speedY: 0, side: 'left'},
    {src: 'assets/background/pic1 (4).png', x: 0, y: 0, speedX: 0, speedY: 0, side: 'right'},
    {src: 'assets/background/pic1 (5).png', x: 0, y: 0, speedX: 0, speedY: 0, side: 'left'},
    {src: 'assets/background/pic1 (1).png', x: 0, y: 0, speedX: 0, speedY: 0, side: 'right'}, // Added
    {src: 'assets/background/pic1 (2).png', x: 0, y: 0, speedX: 0, speedY: 0, side: 'left'},  // Added
    {src: 'assets/background/pic1 (3).png', x: 0, y: 0, speedX: 0, speedY: 0, side: 'right'}, // Added
  ];

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset;
    this.updateImagePositions(scrollPosition);
  }

  ngOnInit() {
    this.initializeImagePositions();
    this.animateImages();
  }

  initializeImagePositions() {
    this.backgroundImages.forEach((img, index) => {
      img.side = index % 2 === 0 ? 'left' : 'right';
      img.x = img.side === 'left' ? Math.random() * 25 : 75 + Math.random() * 25;
      img.y = Math.random() * 100;
      img.speedX = (Math.random() - 0.5) * 0.05;
      img.speedY = (Math.random() - 0.5) * 0.05;
    });
  }

  updateImagePositions(scrollPosition: number) {
    this.backgroundImages.forEach((img, index) => {
      const yPos = img.y - scrollPosition * 0.1;
      const element = document.getElementById(`floating-image-${index}`);
      if (element) {
        element.style.transform = `translate(${img.x}%, ${yPos}%)`;
      }
    });
  }

  animateImages() {
    const animate = () => {
      this.backgroundImages.forEach(img => {
        img.x += img.speedX;
        img.y += img.speedY;

        if (img.side === 'left') {
          if (img.x < 0 || img.x > 25) img.speedX *= -1;
        } else {
          if (img.x < 75 || img.x > 100) img.speedX *= -1;
        }

        if (img.y < 0 || img.y > 100) img.speedY *= -1;
      });
      this.updateImagePositions(window.pageYOffset);
      requestAnimationFrame(animate);
    };
    animate();
  }
}
