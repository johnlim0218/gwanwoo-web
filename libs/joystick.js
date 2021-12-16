export class JoyStick {
  constructor(options) {
    const circle = document.createElement("div");
    circle.style.cssText = "position:absolute; bottom:35px; width:80px; height:80px; background:rgba(126, 126, 126, 0.5); border:#fff solid medium; border-radius:50%; left:50%; transform:translateX(-50%);";
    const thumb = document.createElement("div");
    thumb.style.cssText = "position: absolute; left: 17px; top: 17px; width: 40px; height: 40px; border-radius: 50%; background: #fff;";
		circle.appendChild(thumb);

    this.container = options.container;
    this.container.appendChild(circle);

    this.domElement = thumb;
    this.maxRadius = options.maxRadius || 40;
    this.maxRadiusSquared = this.maxRadius * this.maxRadius;
    this.onMove = options.onMove;
    // this.game = options.game;
    this.origin = { top: this.domElement.offsetTop, left: this.domElement.offsetLeft };

    if (this.domElement != undefined) {
      const joystick = this;
      if ('ontouchstart' in window) {
        this.domElement.addEventListener('touchstart', (e) => {
          joystick.tap(e);
        })
      } else {
        this.domElement.addEventListener('mousedown', (e) => {
          joystick.tap(e);
        })
      }
   
      // window.addEventListener('keypress', (e) => {
      //   if (e.key === 'w') {

      //   } else if (e.key === 's') {

      //   } else if (e.key === 'a') {

      //   } else if (e.key === 'd') {

      //   }
      // })
    }
  }

  tap(e) {
    e = e || window.event;
    this.offset = this.getMousePosition(e);
    const joystick = this;
    if('ontouchstart' in window) {
      this.container.ontouchmove = (e) => joystick.move(e);
      this.container.ontouchend = () => joystick.up();
    } else {
      this.container.onmousemove = (e) => joystick.move(e);
      this.container.onmouseup = () => joystick.up();
    }
  }

  getMousePosition(e) {
    let clientX = e.targetTouches ? e.targetTouches[0].pageX : e.clientX;
    let clientY = e.targetTouches ? e.targetTouches[0].pageY : e.clientY;
    return { x: clientX, y: clientY }
  }

  move(e) {
    e = e || window.event;
    const mouse = this.getMousePosition(e);
    const top = mouse.y - this.offset.y;
    const left = mouse.x - this.offset.x;
    
    const sqMag = left*left + top*top;
		if (sqMag>this.maxRadiusSquared){
			//Only use sqrt if essential
			const magnitude = Math.sqrt(sqMag);
			left /= magnitude;
			top /= magnitude;
			left *= this.maxRadius;
			top *= this.maxRadius;
		}
    // console.log(top + (this.domElement.clientHeight / 2))
    // console.log(left + (this.domElement.clientWidth / 2))
    this.domElement.style.top = `${top + this.domElement.clientHeight / 2}px`;
    this.domElement.style.left = `${left + this.domElement.clientWidth / 2}px`;
    
    const forward = -(top - this.origin.top + this.domElement.clientHeight / 2);
    const turn = (left - this.origin.left + this.domElement.clientWidth/2)/this.maxRadius;
    
    this.onMove(forward, turn);
  }

  up() {
    if ('ontouchstart' in window) {
      this.container.ontouchmove = null;
      this.container.touched = null;
    } else {
      this.container.onmousemove = null;
      this.container.onmouseup = null;
    }

    this.domElement.style.top = `${this.origin.top}px`;
    this.domElement.style.left = `${this.origin.left}px`;

    this.onMove(0, 0);
  }

}