import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import Link from "@material-ui/core/Link";
import styles from "../styles/ItemList.module.scss";

const ItemList = ({ items }) => {
  console.log(items);
  return (
    <div className={styles.list}>
      <GridList cols={4} spacing={12} cellHeight={550}>
        {items.map((item, i) => (
          <Grid key={i} item xs={12} sm={4} md={3} lg={3}>
            <Card key={i}>
              <CardActionArea>
                <Link
                  href={`/itemView/${item.clothes_id}`}
                  style={{ color: "#404040" }}
                >
                  <CardMedia
                    className={styles.cardMedia}
                    component="img"
                    alt={item.name}
                    image={item.img}
                    title={item.name}
                  />
                  <CardContent>
                    <h3>{item.name}</h3>
                  </CardContent>
                </Link>
              </CardActionArea>
              <CardActions className={styles.actions}>
                <button>Add to Cart</button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </GridList>
    </div>
  );
};

export default ItemList;
