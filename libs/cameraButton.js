export class CameraButton {
  constructor(options) {
    const button = document.createElement('div');
    button.style.cssText = "position:absolute; right:15px; bottom:15px; width:40px; height:40px; border:none; border-radius:50%; background:#3B53A2; font-size:25px; color: #fff;";

    this.container = options.container;
    this.container.appendChild(button);
    this.onClick = options.onClick;

    this.domElement = button;

    if (this.domElement != undefined) {
      const cameraButton = this;
      this.domElement.addEventListener('click', () => {
        cameraButton.tab();
      })
    }
  }

  tab() {
    // e = e || window.event;
    this.onClick();
  }
}