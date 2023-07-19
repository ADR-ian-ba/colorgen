const ntc = require('./ntc.js');
var convert = require('color-convert');
 
function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    
    const calculateColor = (c) => {
      const color = c <= 1 ? c : c / 360;
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      const r = Math.round(hue2rgb(p, q, color + 1 / 3) * 255);
      const g = Math.round(hue2rgb(p, q, color) * 255);
      const b = Math.round(hue2rgb(p, q, color - 1 / 3) * 255);
      return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    };
    
    return calculateColor(h / 360);
}

function generateIntervalNormal(initial, end, count){
  const counter = count - 1
  const res = []
  if(initial === end){
      for(let i = 0 ; i<counter ; i++){
          res.push(initial)
      }
      res.push(initial)

  }else if(initial < end){
      const middle = end - initial
      let first = initial
      const interval = Math.floor(middle/counter)

      for(let i = 0 ; i<counter ; i++){
          res.push(first)
          first += interval
      }
      res.push(first)

  }else if(initial > end){
      const middle = initial - end
      let first = initial
      const interval = Math.floor(middle/counter)

      for(let i = 0 ; i<counter ; i++){
          res.push(first)
          first -= interval
      }
      res.push(first)
  }
  return res
}

function generateIntervalBackForth(initial, middle, end, count){
  const res = []

  if(initial > middle && initial < end){
      const length = (initial - middle) + (end - middle)
      const interval = Math.floor(length/count)
      let first = initial
      let bool = false

      for(let i = 0; i<count ; i++){
          if(bool){
              res.push(first)
              first += interval
          }else{
              res.push(first)
              first -= interval
              if(first <= middle){
                  bool = true
                  first = middle
              }
          }
          console.log(first)
      }
  return res

  }else if(initial < middle && initial > end){
      const length = (middle - initial) + (middle - end)
      const interval = Math.floor(length/count)
      let first = initial
      let bool = false

      for(let i = 0 ; i<count ; i++){
          if(bool){
              res.push(first)
              first -= interval
          }else{
              res.push(first)
              first += interval
              if(first >= middle){
                  bool = true
                  first = middle
              }
          }
      }
  return res

  }else if(initial > middle && middle < end){
      const length = (initial - middle) + (end - middle)
      const interval = Math.floor(length/count)
      let first = initial
      let bool = false
      for(let i = 0 ; i<count ; i++){
          if(bool){
              res.push(first)
              first += interval
          }else{
              res.push(first)
              first -= interval
              if(first <= middle){
                  bool = true
                  first = middle
              }
          }
      }
  return res

  }else if(initial < middle && middle > end){
      const length = (middle - initial) + (middle - end)
      const interval = Math.floor(length/count)
      let first = initial
      let bool = false

      for(let i = 0 ; i<count ; i++){
          if(bool){
              res.push(first)
              first -= interval
          }else{
              res.push(first)
              first += interval
              if(first >= middle){
                  bool = true
                  first = middle
              }
          }
      }

  return res
  }else if(initial == end && middle < initial){
      const length = ((initial - middle) * 2)
      const interval = Math.floor(length/count)
      let first = initial
      let bool = false

      for(let i = 0 ; i<count ; i++){
          if(bool){
              res.push(first)
              first += interval
          }else{
              res.push(first)
              first -= interval
              if(first <= middle){
                  bool = true
                  first = middle
              }
          }
      }

      return res
  }else if(initial == end && middle > initial){
      const length = ((middle - initial) * 2)
      const interval = Math.floor(length/count)
      let first = initial
      let bool = false
      for(let i = 0 ; i<count ; i++){
          if(bool){
              res.push(first)
              first -= interval
          }else{
              res.push(first)
              first += interval
              if(first >= middle){
                  bool = true
                  first = middle
              }
          }
      }

      return res
  }else{
      return ("invalid range")
  }
}

function generate1({
  hueInitial =0,
  hueEnd = 350, 
  lightInitial = 50, 
  lightEnd = 50, 
  saturationInitial = 100, 
  saturtionEnd = 100,
  count = 5
} = {}) {
      let resHue = generateIntervalNormal(hueInitial, hueEnd, count)
      let resSaturation = generateIntervalNormal(saturationInitial, saturtionEnd, count)
      let resLight = generateIntervalNormal(lightInitial, lightEnd, count)

      let resHsl = []
      let resHex = []

      for(let i = 0; i<count ; i++){
          let color = []
          color.push(resHue[i])
          color.push(resSaturation[i])
          color.push(resLight[i])
          resHsl.push(color)
      }

      for(let i = 0; i<count ; i++){
          let hex = hslToHex(resHsl[i][0], resHsl[i][1], resHsl[i][2])
          resHex.push(hex)
      }
      return resHex
}

function color(hex, count){
    let res = []

    for(let i = 0 ; i<count ; i++){

        let realName = ntc.name(hex[i])[1]
        let hexName = `#${hex[i]}`
        let colorCode = hex[i]
        let rgbName = convert.hex.rgb(hex[i])
        let hslName = convert.hex.hsl(hex[i])
        let cmykName = convert.hex.cmyk(hex[i])
        let labName = convert.hex.lab(hex[i])
        let hsvName = convert.hex.hsv(hex[i])
        let color = {
            color:colorCode, 
            hexName:hexName, 
            realName:realName,
            rgb:`(${rgbName[0]}, ${rgbName[1]}, ${rgbName[2]})`,
            hsl:`(${hslName[0]}, ${hslName[1]}, ${hslName[2]})`,
            cmyk:`(${cmykName[0]}, ${cmykName[1]}, ${cmykName[2]}, ${cmykName[3]})`,
            lab:`(${labName[0]}, ${labName[1]}, ${labName[2]})`,
            hsv:`(${hsvName[0]}, ${hsvName[1]}, ${hsvName[2]})`

        }
        res.push(color)
    
    }
    return res
}



function generateMonochromatic(count, hueInitial, hueEnd, lightInitial, lightEnd, saturationInitial, saturtionEnd){
    const hex = generate1({
        count:count, 
        hueInitial:hueInitial, 
        hueEnd:hueEnd, 
        lightInitial:lightInitial, 
        lightEnd:lightEnd,
        saturationInitial:saturationInitial,
        saturtionEnd:saturtionEnd
    })

    return color(hex, count)
}


// ["#69d2e7","#a7dbd8","#e0e4cc","#f38630","#fa6900"]
// console.log(generateMonochromatic(10, 0, 360, 10, 80))

function tagGiver(list){
    
    let hslList = []
    let colorList = []
    let styleList = []
    let themeList = []
    let colorCount = {red: 0, orange: 0, yellow: 0, green: 0, lightBlue: 0, darkBlue: 0, purple: 0, pink: 0, magenta: 0, black: 0, gray: 0, white:0}
    let styleCount = {warm: 0, cold: 0, bright:0, dark: 0, pastel: 0,beige: 0, vintage: 0}



    for(let i = 0; i<list.length; i++){
        hslList.push(convert.hex.hsl(list[i]))
    }

    //check color
    for(let i = 0; i<hslList.length; i++){
        let color = hslList[i][0]
        let saturation = hslList[i][1]
        let light = hslList[i][2]


        if(light >= 90 && light <= 100){
            colorCount.white = colorCount.white + 1
            if(!colorList.includes("white")){
                colorList.push("white")
            }
        }
        else if(light >= 0 && light <= 5){
            colorCount.black = colorCount.black + 1
            if(!colorList.includes("black")){
                colorList.push("black")
            }
        }
        else if(saturation >= 0 && saturation <= 10){
            colorCount.gray = colorCount.gray + 1
            if(!colorList.includes("gray")){
                colorList.push("gray")
            }
        }
        else if(color >= 0 && color <= 10 || color >= 351 && color <= 360){
            colorCount.red = colorCount.red + 1
            if(!colorList.includes("red")){
                colorList.push("red")
            }
        }else if(color >= 11 && color <= 40){
            colorCount.orange = colorCount.orange + 1
            if(!colorList.includes("orange")){
                colorList.push("orange")
            }
        }else if(color >= 41 && color <= 70){
            colorCount.yellow = colorCount.yellow + 1
            if(!colorList.includes("yellow")){
                colorList.push("yellow")
            }
        }else if(color >= 71 && color <= 140){
            colorCount.green = colorCount.green + 1
            if(!colorList.includes("green")){
                colorList.push("green")
            }
        }else if(color >= 141 && color <= 210){
            colorCount.lightBlue = colorCount.lightBlue + 1
            if(!colorList.includes("lightBlue")){
                colorList.push("lightBlue")
            }
        }else if(color >= 211 && color <= 250){
            colorCount.darkBlue = colorCount.darkBlue + 1
            if(!colorList.includes("darkBlue")){
                colorList.push("darkBlue")
            }
        }else if(color >= 251 && color <= 290){
            colorCount.purple = colorCount.purple + 1
            if(!colorList.includes("purple")){
                colorList.push("purple")
            }
        }else if(color >= 291 && color <= 330){
            colorCount.pink = colorCount.pink + 1
            if(!colorList.includes("pink")){
                colorList.push("pink")
            }
        }else if(color >= 331 && color <= 350){
            colorCount.magenta = colorCount.magenta + 1
            if(!colorList.includes("magenta")){
                colorList.push("magenta")
            }
        }
    }

    //check style
    for(let i = 0; i<hslList.length; i++){
        let color = hslList[i][0]
        let saturation = hslList[i][1]
        let light = hslList[i][2]

        if(color >= 0 && color <= 90 || color >= 350 && color <= 360){
            styleCount.warm = styleCount.warm + 1
        }else if(color >= 91 && color <= 290){
            styleCount.cold = styleCount.cold + 1
        }

        if(light >= 40 && light <= 60){
            styleCount.bright = styleCount.bright + 1
        }else if(light >= 5 && light <= 30){
            styleCount.dark = styleCount.dark + 1
        }else if(light >= 61 && light <= 80){
            styleCount.pastel = styleCount.pastel + 1
        }

        if (
            ((color >= 25 && color <= 60) ||
            (color >= 61 && color <= 80) || 
            (color >= 200 && color <= 250)) 
            && (
                (saturation >= 0 && saturation <= 100)&&
                (light >= 60 && light <= 100)
            ) 
        ) {
            styleCount.beige = styleCount.beige + 2;
        }

        if (
            (color >= 0 && color <= 240) || 
            (color >= 1355 && color <= 360) 
        
            && (
                (saturation >= 5 && saturation <= 70) || 
                (light >= 30 && light <= 60)
            )
        ) {
            styleCount.vintage = styleCount.vintage + 1;
        }
    }

    //check theme
    if(colorList.includes("lightBlue") && colorList.includes("darkBlue") && colorCount.lightBlue + colorCount.darkBlue >= 3 ){
        themeList.push("water")
    }
    if(colorList.includes("green") && colorCount.green >=3){
        themeList.push("nature")
    }
    if(colorList.includes("lightBlue") && colorList.includes("darkBlue") && colorList.includes("orange") && (styleList.includes("dark") || styleList.includes("bright"))){
        themeList.push("space")
    }
    if(colorList.includes("orange") && (colorList.includes("purple") || colorList.includes("darkBlue")) && (colorList.includes("gray") || colorList.includes("black"))){
        themeList.push("halloween")
    }
    if((colorList.includes("red") && colorList.includes("green") || colorList.includes("red") && colorList.includes("green") && colorList.includes("white") && colorCount.red + colorCount.green >= 3)){
        themeList.push("christmast")
    }
    if (
        (colorList.includes("green") && colorList.includes("blue")) &&
        (styleList.includes("bright") || styleList.includes("dark")) &&
        (colorList.includes("purple") || colorList.includes("pink"))
    ) {
        themeList.push("Enchanted");
    }
    if (colorList.includes("darkBlue") && colorList.includes("white") && colorCount.blue + colorCount.white >= 3) {
        themeList.push("winter");
    }
    if (colorList.includes("orange") && colorList.includes("pink") && colorList.includes("purple") && colorCount.orange + colorCount.pink + colorCount.purple >= 3) {
        themeList.push("sunset");
    }
    if (
        (colorList.includes("orange") &&
        (colorList.includes("red") && (colorList.includes("lightBlue") || colorList.includes("darkBlue"))))
      ) {
        themeList.push("autumn");
      }
    if (colorList.includes("green") && colorList.includes("yellow") && colorCount.green + colorCount.yellow >= 3) {
        themeList.push("summer");
    }
    if ((colorList.includes("gray")|| (colorList.includes("red")|| colorList.includes("magenta"))) && colorCount.gray >= 2) {
        themeList.push("city");
    }
    if (colorList.includes("green") && colorList.includes("darkBlue")) {
        themeList.push("earth");
      }
      if (
        ((colorList.includes("red") || colorList.includes("orange") || colorList.includes("yellow")) &&
        colorList.includes("green") &&
        (colorList.includes("darkBlue") || colorList.includes("lightBlue"))) &&
        (colorList.includes("pink") || colorList.includes("purple") || colorList.includes("magenta"))
      ) {
        themeList.push("rainbow");
      }
    

    //put count style in styleList
    for (const style in styleCount) {
        // Check if the value is greater than or equal to 3
        if (styleCount[style] >= 3) {
            // Add the style to the styleList
            styleList.push(style);
        }
    }



    let colorPallete = {pallete:[], color:colorList, style:styleList, theme:themeList, number: list.length}
    for(let i = 0; i<list.length; i++){
        colorPallete["pallete"].push(list[i])
    }
    
    return colorPallete
}

console.log(tagGiver(["#556270","#4ecdc4","#c7f464","#ff6b6b","#c44d58"]))


module.exports =  generateMonochromatic;




