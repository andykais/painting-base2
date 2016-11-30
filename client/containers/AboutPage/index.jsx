/*
 * Page explaining image generation - pixels and binary numbers
 */

import React from 'react'
import {Link} from 'react-router'
import ColorBlock from '~/components/colorBlock/index.jsx';
import './styles.scss' // import styles

const About = ({}) => (
  <div className="infoPage">
    <h3>The Pixel</h3>
    <p> An Image is a collection of individual colors at certain locations. These colors are called pixels.
        Like most things that you can see on your computer these pixels are made up of numbers.
        When the color green is displayed, the computer sees a pair of three numbers. For the color red the numbers that the computer
        sees are (255, 0, 0). This triple of numbers represents the amount of Red, Green, and Blue colors
        that should be mixed into the individual pixel. This triple is made to be human readable, your computer
        further turns these three numbers into one larger number. For red the triple becomes 16711680. Below is a demo of a color and number generator.
      </p>

    <ColorBlock color={16711680}/>
    <h3> The Image</h3>
    <p> Images are made up of thousands or even millions of pixels depending on the size of an image. Since an image is just made of
    numbers a computer can make them completely randomly. Along with randomly generating the number you can add and subtract from numbers too.
    By using our application random images can be generated and edited all by changing numbers!</p>

    <p>Return to the <Link to='/'>Home</Link> page and try out the application</p>

  </div>
 )

About.propTypes = {}

export default About
