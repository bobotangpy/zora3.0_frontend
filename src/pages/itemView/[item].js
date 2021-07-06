// export const getStaticProps = async () => {
//     const url = "https://localhost:3000/assets/data.json";
//     const getData = await fetch(url);
//     const data = await getData.json();

//     return { props: { data: data }, revalidate: 1 };
//   };

//   export const getStaticPaths = async () => {
//     const url = "https://localhost:3000/assets/data.json";
//     const getData = await fetch(url);
//     const data = await getData.json();
//     const dataArr = [];

//     style_id;
//     gender_id;
//     horoscope_id;

//     const paths = [];
//     _.map(data, (item) => {
//       paths.push({ params: { id: item.id } });
//     });

//     return {
//       paths,
//       fallback: false,
//     };
//   };
