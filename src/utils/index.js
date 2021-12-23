/**
 * html 截图
 * @param {object} options  //宽高配置
 * @param {object} container  //目标元素
 */
import html2canvas from 'html2canvas'
export function screenShot(container, options = {}){
  // 设置放大倍数
  const scale = window.devicePixelRatio;

  // 传入节点原始宽高
  const _width = container.offsetWidth;
  const _height = container.offsetHeight;

  let { width, height } = options;
  

  // html2canvas配置项
  const ops = {
    scale,
    // width,
    // height,
    useCORS: true,
    allowTaint: false,
    width: width ? width : _width,
    height: height ? height : _height
  };
  
  return html2canvas(container, ops).then(canvas => {
    // 返回图片的二进制数据
    return canvas.toDataURL("image/png");
  });
}

/**
 * 视频截图
 * @param {object} container  //目标元素
 */
export function videoScreenShot(container){
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  ctx.drawImage(container, 0, 0);
  return canvas.toDataURL()
}

