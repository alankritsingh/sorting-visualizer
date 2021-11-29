import { useState } from "react";
import './SortingVisualizer.css';
import {mergeSort,quickSort,bubbleSort,heapSort} from "../Algorithms/sorting.js";

import React from 'react'

const SortingVisualizer = () => {
  const dummyArray = [];
  for(let i=0;i<200;i++)
  {
    let add=Math.floor(Math.random()*640+10);
    dummyArray.push(add);
  }

  const [array,setArray] = useState(dummyArray);

  const createArray = () => {
    const newArr=[];
    for(let i=0;i<200;i++)
    {
      let add=Math.floor(Math.random()*640+10);
      newArr.push(add);
    }
    setArray([...newArr]);
    console.log(array);
  }

  function mainBubbleSort()
  {
    console.log("main bubblesort");
    const animations=bubbleSort(array);
    var elements=document.querySelectorAll('.each-element');
    for(let i=0;i<animations.length;i++)
    {


      setTimeout(()=>{
        if(i%4===0)
        {
          //change color to blue
          const [index1,index2]=animations[i];
          elements[index1].style.backgroundColor="blue";
          elements[index2].style.backgroundColor="blue";
        }
        else if(i%4===1)
        {
          //change color to pink

          const [index1,index2]=animations[i];
          elements[index1].style.backgroundColor="pink";
          elements[index2].style.backgroundColor="pink";
        }
        else
        {
          const [index,newHeight]=animations[i];
          elements[index].style.height=`${newHeight}px`;
        }
      },i*0.5);

    }
  }

  function mainHeapSort()
  {
    //console.log("heap sort");

    const animations=heapSort(array);
    var elements=document.querySelectorAll(".each-element");
    console.log(array);
    for(let i=0;i<animations.length;i++)
    {
      setTimeout(()=>{
        if(i%4<2)
        {
          const [index1,index2,h]=animations[i];
          if(i%4===0)
          {
            if(h)
            {
              elements[index1].style.backgroundColor="red";
              elements[index2].style.backgroundColor="red";
            }
            else
            {
              elements[index1].style.backgroundColor="blue";
              elements[index2].style.backgroundColor="blue";
            }
          }
          else
          {
            elements[index1].style.backgroundColor="pink";
            elements[index2].style.backgroundColor="pink";
          }

        }
        else
        {
          const [index,newHeight]=animations[i];
          elements[index].style.height=`${newHeight}px`;
        }
      },i*5);

    }
  }

 function mainMergeSort()
  {
    //console.log("merge sort");

    const animations=mergeSort(array);
    const newAnimations=[];
    for(let i=0;i<animations.length;i++)
    {
      newAnimations.push(animations[i].compare);
      newAnimations.push(animations[i].compare);
      newAnimations.push(animations[i].swap);
    }
    for(let i=0;i<newAnimations.length;i++)
    {

        const elements=document.querySelectorAll(".each-element");

        if(i%3===2)
        {
          setTimeout(()=>{
            const [barOneIndex,newHeight]=newAnimations[i];
            const barOneStyle=elements[barOneIndex].style;
            barOneStyle.height= `${newHeight}px`;
          },i*5);
        }
        else
        {
          setTimeout(()=>{
            if(i%3===0)
            {
              const [barOneIndex,barTwoIndex]=newAnimations[i];
              const barOneStyle=elements[barOneIndex].style;
              const barTwoStyle=elements[barTwoIndex].style;
              barOneStyle.backgroundColor="blue";
              barTwoStyle.backgroundColor="blue";
            }
            else
            {
              const [barOneIndex,barTwoIndex]=newAnimations[i];
              const barOneStyle=elements[barOneIndex].style;
              const barTwoStyle=elements[barTwoIndex].style;
              barOneStyle.backgroundColor="pink";
              barTwoStyle.backgroundColor="pink";
            }
          },i*5);
        }


    }
  }

  function mainQuickSort()
  {
    //console.log("quick sort");
    const animations=quickSort(array);
    var elements=document.querySelectorAll(".each-element");

    for(let i=0;i<animations.length;i++)
    {
        setTimeout(()=>{
        if(i%4<2)
        {
          var color;
          if(i%4===1)
          {
            color="pink";
          }
          else
          {
            color="blue";
          }
          const [index1,index2]=animations[i];
          elements[index1].style.backgroundColor=color;
          elements[index2].style.backgroundColor=color;
        }
        else
        {

          const [index,newHeight]=animations[i];
          elements[index].style.height=`${newHeight}px`;

        }
      },i*10);

    }
  }
  return (
    
    <div className="all-elements">
    {array.map((ele,index) => (
      <div className="each-element" key={index}
    style={{height: `${ele}px`}}></div>
        ))}
        <div>
          <button className="sort-buttons" onClick={mainBubbleSort}>Bubble Sort</button>
          <button className="sort-buttons" onClick={mainHeapSort}>Heap Sort</button>
          <button className="sort-buttons" onClick={mainMergeSort}>Merge Sort</button>
          <button className="sort-buttons" onClick={mainQuickSort}>Quick Sort</button>
        </div>

        <button className="new-array" onClick={createArray}>New Array!</button>

    </div>
  );
}

export default SortingVisualizer;
