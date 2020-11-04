import React, { Component, Fragment } from "react";
import { Button, Input, InputNumber, Space } from "antd";

class RangeFilterInput extends Component {
    
    render() {
        const alpha = this.props.type == "alpha";
        const lowRangeSelection = alpha ? (
            <Input 
                style={{ width: 40, textAlign: 'center', textTransform: "uppercase"}} 
                value={this.props.rangeLo}
                maxLength={this.props.maxInputLength || undefined} 
                onChange={e => this.props.onChange('sortLowVal', e.target.value.toUpperCase().replace(/[^A-Z]/g,''))} // Parse as letter and re-filter
            />
        ) : (
            <InputNumber
                style={{ width: "17ch", textAlign: 'center' }} 
                formatter={v => v.toString().replace(/\D/g,'').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} // Force comma delimited number input
                value={this.props.rangeLo} 
                onChange={e => this.props.onChange('sortLowVal', parseInt(e.toString().replace(/\D/g,'')))} // Parse as number on enter and re-filter
            />
        )
        const hiRangeSelection = alpha ? (
            <Input 
                style={{ width: 40, textAlign: 'center', textTransform: "uppercase" }} 
                value={this.props.rangeHi} 
                maxLength={this.props.maxInputLength || undefined} 
                onChange={e => this.props.onChange('sortHiVal', e.target.value.toUpperCase().replace(/[^A-Z]/g,''))} // Parse as letter and re-filter
            />
        ) : (
            <InputNumber
                style={{ width: "17ch", textAlign: 'center' }} 
                formatter={v => v.toString().replace(/\D/g,'').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} // Force comma delimited number input
                value={this.props.rangeHi} 
                onChange={e => this.props.onChange('sortHiVal', parseInt(e.toString().replace(/\D/g,'')))} // Parse as number on enter and re-filter
            />
        );
        var rangeInput = <div></div>;
        if(this.props.active) {
            if(alpha){
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
            else {
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
            }
        } else {
            rangeInput = (<Button type="text" onClick={() => this.props.onChange('sortLowVal', 0)}>Set Range</Button>)
        }
        return rangeInput;
    }
}

RangeFilterInput.defaultProps = {
    rangeKeyword: 'from',
    rangeLo: 'A',
    rangeHi: 'Z',
    maxInputLength: 1,
    active: true,
    type: 'alpha'
}

export default RangeFilterInput;
