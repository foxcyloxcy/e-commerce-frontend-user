import React, { useState } from 'react';
import {
    Container,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    Collapse,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormControl,
    Input,
    Button,
    RadioGroup,
    Radio,
    Grid
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const DrawerContent = ({ categories, openCategory, handleToggleCategory, isSmallScreen, handleSubCategoryClick, onApplyPriceRange }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleApplyPriceRange = () => {
        console.log(minPrice, maxPrice)
        onApplyPriceRange(minPrice, maxPrice); // Pass price range to parent
    };
    return (
        <Container sx={{ width: 300, paddingLeft: 0 }}>
            <Typography variant="h6" sx={{ paddingTop: 2, paddingBottom: 2 }}>Filters</Typography>
            <Divider />
            {isSmallScreen && (
                <>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ padding: 2 }}>
                        Categories
                    </Typography>
                    <List>
                        {categories.map((category) => (
                            <React.Fragment key={category.id}>
                                <ListItem button onClick={() => handleToggleCategory(category.id)}>
                                    <ListItemText primary={category.name} />
                                    {openCategory[category.id] ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={openCategory[category.id]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {category.sub_category.map((subCategory) => (
                                            <ListItem button key={subCategory.id} sx={{ pl: 4 }} onClick={() => handleSubCategoryClick(subCategory.id)}>
                                                <ListItemText primary={subCategory.name} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            </React.Fragment>
                        ))}
                    </List>
                    <Divider sx={{ marginY: '20px' }} />
                </>
            )}

            <div style={{ padding: 2 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                    Brands
                </Typography>
                <FormGroup>
                    {['Zara', 'Adiddas', 'Nike', 'Probiz', 'Fila'].map((brand) => (
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
                            <Input
                                placeholder="AED 50"
                                type="number"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <Input
                                placeholder="AED 50,000"
                                type="number"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: '10px' }}
                    onClick={handleApplyPriceRange} // Apply price range
                >
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
    );
};

export default DrawerContent;
