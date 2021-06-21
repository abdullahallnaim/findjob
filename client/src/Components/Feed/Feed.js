import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';

const Feed = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [searchTitle, setSearchTitle] = useState("");
        useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            const response = await axios.get(
                "http://localhost:8000/jobdata"
            );
            setData(response.data);
            setLoading(false);
        };

        loadPosts();
    }, []);
    let jobData
    jobData = data.filter(x => {
        if (x.pending === 'false') {
            return x
        }
    })

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(0),
                fontSize: '20px',
                backgroundColor: 'white',
                padding: '5px'
            },
        },
    }));
    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value)
        setCurrentPage(value)
    };


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(24);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = jobData.slice(indexOfFirstPost, indexOfLastPost);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(jobData.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }


    
    const handleClick = (x) => {
        axios.post('http://localhost:8000/applyjob', x)
        .then((response) => {
            if (response){
                alert('You have successfully applied to the job')
            }
        })
    }
    return (
        <>

            <div className='justify-content-center container'>
                <div className="mb-3 mx-auto col-6">
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Search Job Here"
                        type="text"
                        onChange={(e) => setSearchTitle(e.target.value)} />
                </div>
                <div className="">
                    <p>Found <span>{jobData.length} Jobs</span> in total</p>
                </div>
                <div className="container d-flex flex-wrap justify-content-center">
                    {loading ? (
                        <h4>Loading ...</h4>
                    ) : (
                        currentPosts
                            .filter((value) => {
                                if (searchTitle === "") {
                                    return value;
                                } else if (
                                    value.title.toLowerCase().includes(searchTitle.toLowerCase())
                                ) {
                                    return value;
                                }
                            })
                            .map((x) =>
                                <div className='col-3 m-3 p-3' style={{ border: '1px solid lightgrey', borderRadius: '20px' }}>
                                    <h3 className='text-center'>{x.title}</h3>
                                    <p>Posted by : {x.name}</p>
                                    <p>Company Name : {x.company}</p>
                                    <h5>Requirements : </h5>
                                    <div className='w-100'>
                                        {x.requirements}
                                    </div>
                                    <h5>Experience : {x.experience ? x.experience: 'N/A'}</h5>
                                    <h5>Salary : {x.salary ? x.salary: 'N/A'}</h5>
                                    <div className='d-flex justify-content-center mt-5'>
                                        <button className='btn btn-warning' style={{ fontWeight: 'bold', borderRadius: '20px' }} onClick={() => handleClick(x)}>Apply Now</button>
                                    </div>
                                </div>


                            )
                    )}
                </div>
                <div className="">
                    <span className='' style={{ fontSize: '15px' }}>Page {page} of 100:</span>
                    <div className={classes.root}>
                        <Pagination count={100} page={page} onChange={handleChange} color='primary' />
                    </div>
                </div>
            </div>


        </>
    );
};

export default Feed;