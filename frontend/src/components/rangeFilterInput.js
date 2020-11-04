import React, { Component, Fragment } from "react";
import { Button, Input, InputNumber, Space } from "antd";

class RangeFilterInput extends Component {
    state = {
        numericalRange: false
    }
    
    render() {
        const lowRangeSelection = this.props.alphaRange ? (
            <Input 
                style={{ width: 40, textAlign: 'center', textTransform: "uppercase", pattern: "[A-Z]" }} 
                defaultValue={this.props.rangeLo}
                maxLength={this.props.maxInputLength || undefined} 
                onPressEnter={e => this.props.onPressEnter('sortLowVal', e.target.value.replace(/[^A-Z]/g,''))} // Parse as letter and re-filter
            />
        ) : (
            <InputNumber
                style={{ textAlign: 'center' }} 
                formatter={v => v.replace(/\D/g,'').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} // Force comma delimited number input
                defaultValue={this.props.rangeLo} 
                onPressEnter={e => this.props.onPressEnter('sortLowVal', parseInt(e.target.value.replace(/\D/g,'')))} // Parse as number on enter and re-filter
            />
        )
        const hiRangeSelection = this.props.alphaRange ? (
            <Input 
                style={{ width: 40, textAlign: 'center', textTransform: "uppercase" }} 
                defaultValue={this.props.rangeHi} 
                maxLength={this.props.maxInputLength || undefined} 
                onPressEnter={e => this.props.onPressEnter('sortHiVal', e.target.value.replace(/[^A-Z]/g,''))} // Parse as letter and re-filter
            />
        ) : (
            <InputNumber
                style={{ textAlign: 'center' }} 
                formatter={v => v.replace(/\D/g,'').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} // Force comma delimited number input
                defaultValue={this.props.rangeHi} 
                onPressEnter={e => this.props.onPressEnter('sortHiVal', parseInt(e.target.value.replace(/\D/g,'')))} // Parse as number on enter and re-filter
            />
        );
        var rangeInput = <div></div>;
        if(this.props.alphaRange || this.state.numericalRange) {
            if (this.state.numericalRange) {
                rangeInput = (
                    <Fragment>
                        {lowRangeSelection}
                        <Input
                            style={{ width: 40, borderLeft: 0, borderRight: 0, pointerEvents: 'none' }}
                            placeholder="to"
                            disabled
                        />
                        {hiRangeSelection}  
                    </Fragment>
                )
            } else {
                rangeInput = (
                    <Space className="range-component">
                        <div>{this.props.rangeKeyword}</div>
                        <Input.Group>
                            {lowRangeSelection}
                            <Input
                                style={{ width: 40, borderLeft: 0, borderRight: 0, pointerEvents: 'none' }}
                                placeholder="to"
                                disabled
                            />
                            {hiRangeSelection}
                        </Input.Group>
                    </Space>
                )                
            }
        } else {
            rangeInput = (<Button type="text" onClick={() => { this.setState({ numericalRange: true }) }}>Set Range</Button>)
        }
        return rangeInput;
    }
}

RangeFilterInput.defaultProps = {
    rangeKeyword: 'from',
    rangeLo: 'A',
    rangeHi: 'Z',
    maxInputLength: 1,
    alphaRange: true
}

export default RangeFilterInput;
