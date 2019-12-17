import axios from 'axios'
import React, { Component } from 'react';
import Wrapper from '../StyledComponents/Wrapper'
import DrumsStyle from '../StyledComponents/DrumsStyle';



export default class Drums extends Component {
    state={
        kick: document.getElementById("kick"),
        snare: document.getElementById("snare"),
        hiHat: document.getElementById("hiHat"),
        openHat: document.getElementById("openHat"),
        // snare:
        // hiHat:
    }
    kick=()=>{
    this.state.kick.currentTime = 0
    this.state.kick.play()
    }
    snare=()=>{
    this.state.snare.currentTime = 0
    this.state.snare.play()
    }
    hiHat=()=>{
    this.state.hiHat.currentTime = 0
    this.state.openHat.pause()
    this.state.hiHat.play()
    }
    openHat=()=>{
    this.state.openHat.currentTime = 0
    this.state.openHat.play()
    }
            
    render() {
        return (
            <Wrapper>
            <DrumsStyle>
            <div className="two-drums">
            <div className="drum" onClick={this.snare}> Snare</div>
            <div className="drum" onClick={this.kick}> kick</div>
            </div>
            <div className="two-drums">
            <div className="drum" onClick={this.openHat}> Open hat</div>
            <div className="drum" onClick={this.hiHat}> Hi-hat</div>
            </div>
            </DrumsStyle>
            </Wrapper>
        )
    }
}