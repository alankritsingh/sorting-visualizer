function mergeSort(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(array,start,end,aux,animations)
{
  if(start>=end)
  {
    return ;
  }
  const mid=Math.floor((start+end)/2);
  mergeSortHelper(aux,start,mid,array,animations);
  mergeSortHelper(aux,mid+1,end,array,animations);

  mergeArrays(array,start,mid,end,aux,animations);

}


function mergeArrays(array,start,mid,end,aux,animations)
{
  let i=start,k=start,j=mid+1;
  while(i<=mid&&j<=end)
  {
    const newAnimation={};
    newAnimation.compare=[i,j];
    if(aux[i]<=aux[j])
    {
      newAnimation.swap=[k,aux[i]];
      array[k]=aux[i];
      i++;
    }
    else
    {
      newAnimation.swap=[k,aux[j]];
      array[k]=aux[j];
      j++;
    }
    k++;
    animations.push(newAnimation);
  }

  while(i<=mid)
  {
    const newAnimation={compare:[i,i],swap:[k,aux[i]]};
    array[k]=aux[i];
    i++;
    k++;
    animations.push(newAnimation);
  }
  while(j<=end)
  {
    const newAnimation={compare:[j,j],swap:[k,aux[j]]};
    array[k]=aux[j];
    j++;
    k++;
    animations.push(newAnimation);
  }
}


function quickSort(array)
{
  const animations=[];
  if(array.length===1)
  {
    return animations;
  }
  quickSortHelper(array,0,array.length-1,animations);
  return animations;

}

function quickSortHelper(array,start,end,animations)
{
  if(start>=end)
  {
    return;
  }
  var pivot=array[start];
  var i=start,j=end;
  while(j>=i)
  {
    while(i<=end&&array[i]<=pivot)
    {
      i++;
    }
    while(j>=start&&array[j]>pivot)
    {
      j--;
    }
    if(i<=j)
    {
      animations.push([i,j]);
      animations.push([i,j]);
      animations.push([i,array[j]]);
      animations.push([j,array[i]]);
      var temp=array[i];
      array[i]=array[j];
      array[j]=temp;
    }
  }
  animations.push([start,j]);
  animations.push([start,j]);
  animations.push([start,array[j]]);
  animations.push([j,array[start]]);
  var temp1=array[j];
  array[j]=array[start];
  array[start]=temp1;
  quickSortHelper(array,start,j-1,animations);
  quickSortHelper(array,j+1,end,animations);
}


function bubbleSort(array)
{
  const n=array.length;
  const b=array;
  const animations=[];
  for(let j=0;j<n;j++)
  {
    for(let i=0;i<n-1;i++)
    {
      if(b[i]>b[i+1])
      {
        animations.push([i,i+1]);
        animations.push([i,i+1]);
        animations.push([i,b[i+1]]);
        animations.push([i+1,b[i]]);
        let temp=b[i];
        b[i]=b[i+1];
        b[i+1]=temp;
      }
    }
  }

  return animations;
}

function heapSort(array)
{
  const animations=[];
  heapify(array,animations);

  for(let i=array.length-1;i>0;i--)
  {
    
    animations.push([i,0,0]);
    animations.push([0,i,0]);
    animations.push([0,array[i]]);
    animations.push([i,array[0]]);
    const temp=array[0];
    array[0]=array[i];
    array[i]=temp;
    let index=0;
    while(index<i)
    {
      const l=2*index+1,r=2*index+2;
      if(l>=i&&r>=i)
      {
        break;
      }
      if(l<i&&r>=i)
      {
        if(array[l]>array[index])
        {
          animations.push([index,l,1]);
          animations.push([l,index,1]);
          animations.push([l,array[index]]);
          animations.push([index,array[l]]);
          const temp=array[index];
          array[index]=array[l];
          array[l]=temp;
          index=l;
          continue;
        }
        else
        {
          break;
        }
      }
      else if(l>=i&&r<i)
      {
        if(array[r]>array[index])
        {
          animations.push([index,r,1]);
          animations.push([r,index,1]);
          animations.push([r,array[index]]);
          animations.push([index,array[r]]);
          const temp=array[index];
          array[index]=array[r];
          array[r]=temp;
          index=r;
          continue;
        }
        else
        {
          break;
        }
      }
      else
      {
        if(array[index]>=array[l]&&array[index]>=array[r])
        {
          break;
        }
        else if(array[l]>=array[r])
        {
          animations.push([index,l,1]);
          animations.push([l,index,1]);
          animations.push([l,array[index]]);
          animations.push([index,array[l]]);
          const temp=array[index];
          array[index]=array[l];
          array[l]=temp;

          index=l;
        }
        else
        {
          animations.push([index,r,1]);
          animations.push([r,index,1]);
          animations.push([r,array[index]]);
          animations.push([index,array[r]]);
          const temp=array[index];
          array[index]=array[r];
          array[r]=temp;
          index=r;
        }
      }
    }
  }
  return animations;
}

function heapify(array,animations)
{
  for(let i=0;i<array.length;i++)
  {
    let index=i;
    while(index>=1&&array[Math.floor((index-1)/2)]<array[index])
    {
      animations.push([index,Math.floor((index-1)/2),1]);
      animations.push([index,Math.floor((index-1)/2),1]);
      animations.push([index,array[Math.floor((index-1)/2)]]);
      animations.push([Math.floor((index-1)/2),array[index]]);
      const temp=array[index];
      array[index]=array[Math.floor((index-1)/2)];
      array[Math.floor((index-1)/2)]=temp;
      index=Math.floor((index-1)/2);
    }
  }
}

export {mergeSort,quickSort,bubbleSort,heapSort};
