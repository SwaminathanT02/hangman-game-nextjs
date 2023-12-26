import { Image } from "@mui/icons-material";

const ImageComponent = ({ mistakes }) => {
    return (
        <Image
            src={require(`../../../public/images/stick-${mistakes}.png`)}
            alt={`Stick figure with ${mistakes} mistakes`}
            sx={{
                margin: '20px auto',
                maxWidth: '400px',
                borderRadius: '100%'
            }}
        ></Image>
    );
}

export default ImageComponent;