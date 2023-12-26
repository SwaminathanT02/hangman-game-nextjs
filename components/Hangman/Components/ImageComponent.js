import Image from 'next/image';
import ImageData from '../LoadImages';


const ImageComponent = ({ mistakes }) => {

    return (
        <Image
            src={ImageData[mistakes]}
            alt={`Stick figure with ${mistakes} mistakes`}
            width={400}
            height={200}
        />
    );
};

export default ImageComponent;
