import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import { Container, CrossOutStep, EditorStep, GroupStep, ListStep, NameStep } from './components/Steps'
import theme from './theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Container>
            <Route exact path='/steps/name' component={NameStep} />
            <Route exact path='/steps/list' component={ListStep} />
            <Route exact path='/steps/cross-out' component={CrossOutStep} />
            <Route exact path='/steps/group' component={GroupStep} />
            <Route exact path='/steps/editor' component={EditorStep} />
          </Container>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
