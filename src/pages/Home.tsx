import {
    PrismicLink,
    PrismicRichText,
    usePrismicDocumentsByType,
    useSinglePrismicDocument
} from '@prismicio/react'
import * as prismicH from "@prismicio/helpers";
import Loader from '../components'
import Layout from "../components/Layout";
import NotFound from "./NotFound";
import {useEffect} from "react";

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
                <section className='container text-center'>
                    <div className='row py-lg-5'>
                        <div className='col'>
                            {/*// @ts-ignore*/}
                            <PrismicRichText field={home.data.title} components={{
                                heading1: ({ children }) => <h1 className="display-1">{children}</h1>
                            }}/>
                            {/*// @ts-ignore*/}
                            <img src={home.data.image.url} alt={home.data.image.alt} className='rounded mb-3'/>
                            {/*// @ts-ignore*/}
                            <PrismicRichText field={home.data.description} components={{
                                paragraph: ({ children }) => <p className="lead">{children}</p>,
                            }}/>
                        </div>
                    </div>
                </section>
                <div className='container'>
                    {experiences?.results.map(((experience, index) => (
                        <div key={index} className='row'>
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
                            <hr/>
                        </div>
                    )))}
                </div>
            </Layout>
        )
    }
    else if (notFound) {
        return <NotFound/>
    }

    return <Loader/>
}

export default Home
