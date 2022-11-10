import { h } from '@stencil/core';
import { SVGOpts } from '../icons-opts';

export const AddToCart = (opts?: SVGOpts) => (
  <svg xmlns="http://www.w3.org/2000/svg" class={opts?.class} viewBox="0 0 576 512">
    <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L161.6 240H477.6L520.7 80H472C458.7 80 448 69.25 448 56C448 42.75 458.7 32 472 32H552C559.5 32 566.5 35.47 571 41.4C575.6 47.33 577.1 55.03 575.2 62.24L519.2 270.2C516.4 280.7 506.9 288 496 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464zM232 128C232 114.7 242.7 104 256 104H296V64C296 50.75 306.7 40 320 40C333.3 40 344 50.75 344 64V104H384C397.3 104 408 114.7 408 128C408 141.3 397.3 152 384 152H344V192C344 205.3 333.3 216 320 216C306.7 216 296 205.3 296 192V152H256C242.7 152 232 141.3 232 128z" />
  </svg>
);
