import {
    PrismicLink,
    PrismicRichText,
    usePrismicDocumentsByType,
    useSinglePrismicDocument
} from '@prismicio/react'
import * as prismicH from "@prismicio/helpers";
import Loader from '../components'
import NotFound from "./NotFound";
import {useEffect} from "react";
import Layout from "../components/Layout";

function Home() {

    const [home, homeState] = useSinglePrismicDocument('home')
    const [experiences, experiencesState] = usePrismicDocumentsByType('experience')

    const notFound = homeState.state === "failed" || experiencesState.state === "failed";

    useEffect(() => {
        if (homeState.state === "failed") {
            console.warn(
                "Home document was not found. Make sure it exists in your Prismic repository"
            );
        }
    }, [homeState.state]);

    if (home && experiences?.results) {
        return (
            // @ts-ignore
            <Layout title={prismicH.asText(home.data.title)} description={prismicH.asText(home.data.description)}>
                <div className='intro'>
                    {/*// @ts-ignore*/}
                    <PrismicRichText field={home.data.title}/>
                    {/*// @ts-ignore*/}
                    <img src={home.data.image.url} alt={home.data.image.alt}/>
                    {/*// @ts-ignore*/}
                    <PrismicRichText field={home.data.description}/>
                </div>
                <div className='experiences'>
                    {experiences?.results.map(((experience, index) => (
                        <div key={index} className='experience'>
                            <PrismicLink document={experience}>
                                {/*// @ts-ignore*/}
                                <PrismicRichText field={experience.data.title} />
                            </PrismicLink>
                            {/*// @ts-ignore*/}
                            <PrismicRichText field={experience.data.company} />
                            <time>{experience.data.date_from}</time>
                            {experience.data.current ? (<time>now</time>) : (<time>{experience.data.date_to}</time>) }
                            {/*// @ts-ignore*/}
                            <PrismicRichText field={experience.data.description} />
                        </div>
                    )))}
                </div>
            </Layout>
        )
    }
    else if (homeState.state === "loading") {
        return <Loader/>
    }

    return <NotFound/>
}

export default Home
