import {
    PrismicLink,
    PrismicRichText,
    PrismicText,
    SliceZone,
    SliceZoneComponents,
    SliceComponentProps,
    usePrismicDocumentsByType,
    useSinglePrismicDocument
} from '@prismicio/react'
import * as prismicH from "@prismicio/helpers";
import Loader from '../components'
import Layout from "../components/Layout";
import NotFound from "./NotFound";
import {useEffect} from "react";
import * as prismicT from "@prismicio/types";

type CompanySliceProps = prismicT.Slice<
    "companies",
    {
        name: string;
        logo: prismicT.ImageField;
    }
>;

const CompanySlice = ({ slice }: SliceComponentProps<CompanySliceProps>) => {
    return (
        <section className='card-group mb-5'>
            {slice.items.map(((company, index) => (
                    <div key={index} className="card border-0 mx-auto">
                        {/*@ts-ignore*/}
                        <img src={company.logo?.url} alt={company.logo?.alt} className='card-img-top mx-auto' style={{width: company.logo.dimensions.width, height: company.logo.dimensions.height}}/>
                            <h6 className="card-subtitle text-muted text-center mt-2">
                                <PrismicText field={company.name as prismicT.RichTextField}/>
                            </h6>
                    </div>
            )))}
        </section>
    );
};

const slices: SliceZoneComponents<CompanySliceProps> = {
    // Since CompanySlice accepts a `slice` prop, we can pass the component directly.
    companies: CompanySlice,
};

type HomeType = prismicT.PrismicDocument<
    {
        title: prismicT.RichTextField;
        description: prismicT.RichTextField;
        image: prismicT.ImageFieldImage;
        body: prismicT.SliceZone<CompanySliceProps>
    }
>;

type ExperienceType = prismicT.PrismicDocument<
    {
        title: prismicT.RichTextField;
        description: prismicT.RichTextField;
        company: prismicT.RichTextField;
        date_from: prismicT.DateField;
        date_to: prismicT.DateField;
        current: prismicT.BooleanField;
    }
>;

function Home() {

    const [home, homeState] = useSinglePrismicDocument<HomeType>('home')
    const [experiences, experiencesState] = usePrismicDocumentsByType<ExperienceType>('experience')

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
            <Layout title={prismicH.asText(home.data.title) as string}
                    description={prismicH.asText(home.data.description) as string}>
                <section className='container text-center'>
                    <div className='row py-lg-5'>
                        <div className='col'>
                            <PrismicRichText field={home.data.title} components={{
                                heading1: ({children}) => <h1 className="display-1">{children}</h1>
                            }}/>
                            <img src={home.data.image.url as string} alt={home.data.image.alt as string}
                                 className='rounded mb-3'/>
                            <PrismicRichText field={home.data.description} components={{
                                paragraph: ({children}) => <p className="lead">{children}</p>,
                            }}/>
                        </div>
                    </div>
                </section>
                <section className='container'>

                    <SliceZone slices={home.data.body} components={slices}  />

                </section>
                <div className='container'>
                    {experiences?.results.map(((experience, index) => (
                        <div key={index} className='row'>
                            <PrismicLink document={experience}>
                                <PrismicRichText field={experience.data.title}/>
                            </PrismicLink>
                            <PrismicRichText field={experience.data.company}/>
                            <time>{experience.data.date_from}</time>
                            {experience.data.current ? (<time>now</time>) : (<time>{experience.data.date_to}</time>)}
                            <PrismicRichText field={experience.data.description}/>
                            <hr/>
                        </div>
                    )))}
                </div>
            </Layout>
        )
    } else if (notFound) {
        return <NotFound/>
    }

    return <Loader/>
}

export default Home
