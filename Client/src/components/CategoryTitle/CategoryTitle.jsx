import './CategoryTitle.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const CategoryTitle = ({ category, image }) => {

  return (
    <>
      <Link to={`/category/${category}`} className='text-decoration-none'>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={image}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {category.toUpperCase()}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </>
  )
}

export default CategoryTitle