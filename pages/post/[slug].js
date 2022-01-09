import styles from '../../styles/Post.module.css';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';
import BlockContent from '@sanity/block-content-to-react'
import { ToolBar } from '../../components/toolbar';


export const Post = ({ title, body, image }) => {
    const [imageUrl, setImageUrl] = useState('');
    useEffect(() => {
        const imageBuilder = imageUrlBuilder({
            projectId: 'zaglmuyu',
            dataset: 'production'
        });

        setImageUrl(imageBuilder.image(image));
    }, [image]);

    return(
        <div>
            <ToolBar />
            <div className={styles.main}>
                <h1>{title}</h1>
                {imageUrl && <img className={styles.mainImage} src={imageUrl}/>}
            </div>
            <div className={styles.body}>
                <BlockContent blocks={body} />
            </div>
        </div>
    );
};

export const getServerSideProps = async pageContext => {
    const pageSlug = pageContext.query.slug;

    if(!pageSlug) {
        return {
            notFound: true
        };
    }

    const query = encodeURIComponent(` *[ _type=="post" && slug.current == "${pageSlug}" ] `);
    const url = `https://zaglmuyu.api.sanity.io/v2022-01-09/data/query/production?query=${query}`;

    const result = await fetch(url).then(result => result.json());

    const post = result.result[0];

    if(!post){
        return {
            notFound: true
        }
    }
    else {
        return {
                props: {
                title: post.title,
                body: post.body,
                image: post.mainImage
            }
        }
    }
}

export default Post;