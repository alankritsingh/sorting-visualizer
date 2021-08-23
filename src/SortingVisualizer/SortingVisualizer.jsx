import React from "react";
import './SortingVisualizer.css';
import {mergeSort,quickSort,bubbleSort,heapSort} from "../Algorithms/sorting.js";


 export default class SortingVisualizer extends React.Component{

   constructor(props){
     super(props);
     this.state={
       array: [],
     };
   }


   componentDidMount(){
     this.makeArray();
   }


   makeArray(){
     let array=[];
     for(let i=0;i<200;i++)
     {
       let add=Math.floor(Math.random()*640+10);
       array.push(add);
     }

     //let array=[557, 254, 324, 359, 493, 164, 548, 337, 626, 302];


     this.setState({array});
   }

   mainBubbleSort(){
     const animations=bubbleSort(this.state.array);
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

   heapSort(){

     const animations=heapSort(this.state.array);
     var elements=document.querySelectorAll(".each-element");
     console.log(this.state.array);
     for(let i=0;i<animations.length;i++)
     {
       setTimeout(()=>{
         if(i%4<2)
         {
           const [index1,index2,h]=animations[i];
           if(i%4==0)
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

   mergeSort(){


     const animations=mergeSort(this.state.array);
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

   quickSort(){
     const animations=quickSort(this.state.array);
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
     console.log(check(this.state.array));
   }

   render(){
     const {array}=this.state;
     return (
       <div className="all-elements">
       {array.map((ele,index) => (
         <div className="each-element" key={index}
       style={{height: `${ele}px`}}></div>
          ))}
          <div>
            <button className="sort-buttons" onClick={()=> this.mainBubbleSort()}>Bubble Sort</button>
            <button className="sort-buttons" onClick={()=> this.heapSort()}>Heap Sort</button>
            <button className="sort-buttons" onClick={()=> this.mergeSort()}>Merge Sort</button>
            <button className="sort-buttons" onClick={()=> this.quickSort()}>Quick Sort</button>
          </div>

          <button className="new-array" onClick={()=> this.makeArray()}>New Array!</button>

       </div>
     );
   }
 };


 function check(array)
 {
   for(var i=0;i<array.length-1;i++)
   {
     if(array[i+1]<array[i])
     {
       return false;
     }
   }
   return true;
 }
