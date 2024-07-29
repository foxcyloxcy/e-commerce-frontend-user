import React from 'react';
import {
    Toolbar,
    Typography,
    Container,
    Grid,
    FormControl,
    Input,
    Checkbox,
    Button,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    Divider,
} from '@mui/material';
import ModTheme from '../ThemeComponent/ModTheme';

const DrawerContent = (props) => {
    const {isSmallScreen, categories} = props
return (
    <Container sx={{ width: 300, paddingLeft: 0 }}>
        <Typography variant="h6" sx={{ paddingTop: 2, paddingBottom: 2 }}>Filters</Typography>
        {isSmallScreen && (
            <>
                <Divider />
                <Typography variant="h6" component="h3" gutterBottom sx={{ padding: 2 }}>
                    Categories
                </Typography>
                <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', background: ModTheme.palette.secondary.contrastText }}>
                    {categories.map((category) => (
                        <div key={category.id}>
                            <Button
                                color="inherit"
                                onClick={() => handleCategoryChange(category.id)}
                            >
                                {category.name}
                            </Button>
                            {selectedCategory === category.id && subCategories.length > 0 && (
                                <div style={{ paddingLeft: '20px' }}>
                                    {subCategories.map((subCategory) => (
                                        <Button key={subCategory.id} color="inherit">
                                            {subCategory.name}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </Toolbar>
                <Divider sx={{ marginY: '20px' }} />
            </>
        )}
        <div style={{ padding: 2 }}>
            {!isSmallScreen && <Divider />}
            <Typography variant="h6" component="h3" gutterBottom>
                Brands
            </Typography>
            <FormGroup>
                {['Mercedes', 'Toyota', 'Mitsubishi', 'Nissan', 'Honda'].map((brand) => (
                    <FormControlLabel
                        key={brand}
                        control={<Checkbox />}
                        label={
                            <div>
                                {brand}
                                <Typography component="span" variant="body2" sx={{ float: 'right' }}>
                                    {Math.floor(Math.random() * 100)}
                                </Typography>
                            </div>
                        }
                    />
                ))}
            </FormGroup>
            <Divider sx={{ marginY: '20px' }} />
            <Typography variant="h6" component="h3" gutterBottom>
                Price range
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <Input placeholder="AED 50" type="number" />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <Input placeholder="AED 50,000" type="number" />
                    </FormControl>
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" fullWidth sx={{ marginTop: '10px' }}>
                Apply
            </Button>
            <Divider sx={{ marginY: '20px' }} />
            <Typography variant="h6" component="h3" gutterBottom>
                Sizes
            </Typography>
            <FormGroup row>
                {['XS', 'SM', 'LG', 'XXL'].map((size) => (
                    <FormControlLabel
                        key={size}
                        control={<Checkbox />}
                        label={<Button variant="outlined">{size}</Button>}
                    />
                ))}
            </FormGroup>
            <Divider sx={{ marginY: '20px' }} />
            <Typography variant="h6" component="h3" gutterBottom>
                More filter
            </Typography>
            <RadioGroup defaultValue="any">
                {['Any condition', 'Brand new', 'Used items', 'Very old'].map((condition) => (
                    <FormControlLabel key={condition} value={condition.toLowerCase()} control={<Radio />} label={condition} />
                ))}
            </RadioGroup>
        </div>
    </Container>
)
}

export default DrawerContent;