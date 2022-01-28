import {useParams} from "react-router-dom";
import {PrismicLink, PrismicRichText, usePrismicDocumentByUID} from "@prismicio/react";
import Layout from "../components/Layout";
import {useEffect} from "react";
import NotFound from "./NotFound";
import Loader from "../components";
import * as prismicH from "@prismicio/helpers";

export const Experience = () => {
    const {uid} = useParams();
    // @ts-ignore
    const [experience, experienceState] = usePrismicDocumentByUID("experience", uid);

    const notFound = experienceState.state === "failed";

    useEffect(() => {
        if (experienceState.state === "failed") {
            console.warn(
                "Page document was not found. Make sure it exists in your Prismic repository"
            );
        }
    }, [experienceState.state]);


    if (experience) {
        // @ts-ignore
        const title = prismicH.asText(experience.data.company) + ' / ' + prismicH.asText(experience.data.title);
        return (
            <Layout title={title}>
                {/*// @ts-ignore*/}
                <PrismicRichText field={experience.data.title} />
                {/*// @ts-ignore*/}
                <img src={experience.data.logo.url} alt={experience.data.logo.alt}/>
                {/*// @ts-ignore*/}
                <PrismicRichText field={experience.data.company} />
                From: <time>{experience.data.date_from}</time><br/>
                To: {experience.data.current ? (<time>now</time>) : (<time>{experience.data.date_to}</time>) }
                {/*// @ts-ignore*/}
                <PrismicRichText field={experience.data.description} />
                <PrismicLink href='/'>Home</PrismicLink>
            </Layout>
        )
    }
    else if (notFound) {
        return <NotFound/>
    }

    return <Loader/>
}