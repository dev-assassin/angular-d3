import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { Stocks } from './shared/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;

  constructor() {
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawLine();
  }

  private initSvg() {
    // this.svg = d3.select('#visualisation')
    //              .append('g')
    //              .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    this.svg = d3.select("#visualisation")
                .append("g")
                .attr("width", this.width + this.margin.left + this.margin.right)
                .attr("height", this.height + this.margin.top + this.margin.bottom)
                .append("g").attr("transform",
                    "translate(" + this.margin.left + "," + this.margin.top + ")");
    this.svg.append('line')
            .attr('x1', 0)
            .attr('y1', 28)
            .attr('x2', 850)
            .attr('y2', 28)
            .style('stroke', 'rgb(255, 0, 0)')
            .style('stroke-width', 2);
    this.svg.append('line')
            .attr('x1', 0)
            .attr('y1', 310)
            .attr('x2', 850)
            .attr('y2', 310)
            .style('stroke', 'rgb(255, 0, 0)')
            .style('stroke-width', 2);
    this.svg.append('circle')
            .attr('cx', 394)
            .attr('cy', 2)
            .attr('r', 20)
            .attr('fill', 'red');
  }

  private initAxis() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(Stocks, (d) => d.scale));
    this.y.domain(d3Array.extent(Stocks, (d) => d.value));
  }

  private drawAxis() {
    this.svg.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0, ' + this.height + ')')
            .call(d3Axis.axisBottom(this.x));

    this.svg.append('g')
            .attr('class', 'axis axis--y')
            .call(d3Axis.axisLeft(this.y))
            .append('text')
            .attr('class', 'axis-title')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Value ($)');
  }

  private drawLine() {
    this.line = d3Shape.line()
                       .x( (d: any) => this.x(d.scale) )
                       .y( (d: any) => this.y(d.value) );

    this.svg.append('path')
            .datum(Stocks)
            .attr('class', 'line')
            .attr('d', this.line)
            .style('stroke', 'rgb(0, 0, 255)');
  }

}
