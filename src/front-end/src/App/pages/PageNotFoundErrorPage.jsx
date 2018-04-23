import React from 'react';
import Typography from "material-ui/es/Typography/Typography";

class PageNotFoundErrorPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Typography variant="headline">Страница не найдена.</Typography>
    }
}

export default PageNotFoundErrorPage;