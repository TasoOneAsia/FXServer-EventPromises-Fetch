import { onNetPromise } from './onNetPromise';

// Interface for our random data
interface RandomDataDTO {
  niceProperty: boolean;
  niceString: string;
  libertyMWhen: string;
}

interface TypeReturnData {
  wowNiceField: boolean,
  onionCropYield: string,
  isAngularJs: boolean
}

onNetPromise<TypeReturnData>('myNetPromise', (source: number, arg1: string, arg2: RandomDataDTO) => {
  console.log('Coming from source ${source}');
  console.log('Arg1:', arg1)
  console.log('Arg2:', arg2)

  // Do something and calculate return data

  // ...hugeBrainCalc()

  // Data we want to send back to the client we must return in the callback
  const returnData = {
    wowNiceField: true,
    onionCropYield: '100%',
    isAngularJs: true
  }

  return returnData
});


onNetPromise<TypeReturnData>('netPromiseError', (source: number, arg1: string, arg2: RandomDataDTO) => {
  console.log('Coming from source ${source}');
  console.log('Arg1:', arg1)
  console.log('Arg2:', arg2)

  // Do something and calculate return data
  // But what if we encounter an error here and want to exit and respond?
  // For this case we want to return an array with index 0 being the error message
  // and index 1 being any other data we wish to return

  return ['Uh oh we screwed up']


  return ['Uh oh we really screwed up', 'My additional data']
  // ...hugeBrainCalc()

  // Data we want to send back to the client we must return in the callback
  const returnData = {
    wowNiceField: true,
    onionCropYield: '100%',
    isAngularJs: true
  }

  return returnData
});

