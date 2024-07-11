import Button from '@mui/material/Button';


export default function Button(props) {
    console.log(props)
}

return (
    <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
    >
        {props}
    </Button>
)