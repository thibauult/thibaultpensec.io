import {Link, useParams} from "react-router-dom";
import {LinkProps, PrismicLink, PrismicRichText, usePrismicDocumentByUID} from "@prismicio/react";
import {RichTextField, ImageFieldImage, PrismicDocument, KeyTextField} from '@prismicio/types';
import Layout from "../components/Layout";
import {useEffect} from "react";
import NotFound from "./NotFound";
import Loader from "../components";
import * as prismicH from "@prismicio/helpers";

type ExperienceType = PrismicDocument<
    {
        title: RichTextField,
        description: RichTextField,
        company: RichTextField,
        logo: ImageFieldImage,
        date_from: RichTextField,
        date_to: RichTextField,
        current: KeyTextField
    }
>;

// This React component acts as a "shim" to convert the `href` prop provided by
// `<PrismicLink>` to the `to` prop required by react-router-dom's `<Link>`.
const LinkShim = ({ href, ...props }: LinkProps) => {
    return <Link className='btn btn-primary' to={href} {...props} />;
};

export const Experience = () => {
    const {uid} = useParams();
    // @ts-ignore
    const [experience, experienceState] = usePrismicDocumentByUID<ExperienceType>("experience", uid);

    const notFound = experienceState.state === "failed";

    useEffect(() => {
        if (experienceState.state === "failed") {
            console.warn(
                "Page document was not found. Make sure it exists in your Prismic repository"
            );
        }
    }, [experienceState.state]);


    if (experience) {
        const title = prismicH.asText(experience.data.company) + ' / ' + prismicH.asText(experience.data.title);
        return (
            <Layout title={title}>
                <div className='py-lg-5 container'>
                    <div className='row'>
                        <div className="col">
                            <img src={experience.data.logo.url as string} alt={experience.data.logo.alt as string}/>
                            <PrismicRichText field={experience.data.title} />
                            <PrismicRichText field={experience.data.company} />
                            <div className="fw-light">
                                From: <time>{experience.data.date_from}</time><br/>
                                To: {experience.data.current ? (<time>now</time>) : (<time>{experience.data.date_to}</time>) }
                            </div>
                            <PrismicRichText field={experience.data.description} />
                            <PrismicLink href='/' internalComponent={LinkShim}>Home</PrismicLink>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
    else if (notFound) {
        return <NotFound/>
    }

    return <Loader/>
}