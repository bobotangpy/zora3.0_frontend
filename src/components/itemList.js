import { useRouter } from "next/router";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import ImageList from "@material-ui/core/ImageList";
import Link from "@material-ui/core/Link";
import styles from "../styles/ItemList.module.scss";

const Content = ({ item }) => {
  const router = useRouter();

  return (
    <Link
      // href={{ pathname: "/productInfo/[item]", query: { item: item.product_id } }}
      // href="/productInfo/[item]"
      // as={`/productInfo/${item.product_id}`
      style={{ color: "#404040" }}
      onClick={() =>
        router.push(`/productInfo/${item.product_id}`, undefined, {
          // shallow: true,
        })
      }
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
  );
};

const ItemList = ({ items, suggestions }) => {
  // console.log(items);
  return (
    <div className={styles.list}>
      <ImageList cols={4} gap={12} rowHeight={550}>
        {items.map((data, i) => (
          <Grid key={i} item xs={12} sm={4} md={3} lg={3}>
            <Card key={i}>
              {!suggestions ? (
                <>
                  <CardActionArea>
                    <Content item={data} />
                  </CardActionArea>

                  <CardActions className={styles.actions}>
                    <button>Add to Cart</button>
                  </CardActions>
                </>
              ) : (
                <CardActionArea>
                  <Content item={data} />
                </CardActionArea>
              )}
            </Card>
          </Grid>
        ))}
      </ImageList>
    </div>
  );
};

export default ItemList;
