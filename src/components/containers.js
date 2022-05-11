import Button from './buttons';


export function GroupTitle(props) {
    if (!props.children)
        return null;

    return (
        <div className="rjf-form-group-title row"><div className="col">{props.children}</div></div>
    );
}


function animate(e, animation, callback) {

    let el;

    if (e.target.tagName.toLowerCase() === 'button'){el = e.target.parentElement.parentElement } else {el = e.target.parentElement.parentElement.parentElement };

    // let el = e.target.parentElement.parentElement.parentElement;
    let prevEl = el.previousElementSibling;
    let nextEl = el.nextElementSibling;

    el.classList.add('rjf-animate', 'rjf-' + animation);

    if (animation === 'move-up') {
        let { y, height } = prevEl.getBoundingClientRect();
        let y1 = y, h1 = height;

        ({ y, height } = el.getBoundingClientRect());
        let y2 = y, h2 = height;

        prevEl.classList.add('rjf-animate');

        prevEl.style.opacity = 0;
        prevEl.style.transform = 'translateY(' + (y2 - y1) + 'px)';

        el.style.opacity = 0;
        el.style.transform = 'translateY(-' + (y2 - y1) + 'px)';

    } else if (animation === 'move-down') {
        let { y, height } = el.getBoundingClientRect();
        let y1 = y, h1 = height;

        ({ y, height } = nextEl.getBoundingClientRect());
        let y2 = y, h2 = height;

        nextEl.classList.add('rjf-animate');

        nextEl.style.opacity = 0;
        nextEl.style.transform = 'translateY(-' + (y2 - y1) + 'px)';

        el.style.opacity = 0;
        el.style.transform = 'translateY(' + (y2 - y1) + 'px)';
    }

    setTimeout(function () {
        callback();

        el.classList.remove('rjf-animate', 'rjf-' + animation);
        el.style = null;

        if (animation === 'move-up') {
            prevEl.classList.remove('rjf-animate');
            prevEl.style = null;
        }
        else if (animation === 'move-down') {
            nextEl.classList.remove('rjf-animate');
            nextEl.style = null;
        }
    }, 200);
}




export function FormRowControls(props) {

    if(props.onMoveDown == null && props.onMoveUp == null && props.onRemove == null){return null;}else {return (
        <div className="rjf-form-row-controls col-sm-12 col-md-2">
            {props.onMoveUp &&
                <Button
                    className="move-up"
                    onClick={(e) => animate(e, 'move-up', props.onMoveUp)}
                    title="Move up"
                >
                    <span>&uarr;</span>
                </Button>
            }
            {props.onMoveDown &&
                <Button
                    className="move-down"
                    onClick={(e) => animate(e, 'move-down', props.onMoveDown)}
                    title="Move down"
                >
                    <span>&darr;</span>
                </Button>
            }
            {props.onRemove &&
                <Button
                    className="remove"
                    onClick={(e) => animate(e, 'remove', props.onRemove)}
                    title="Remove"
                >
                    <span>&times;</span>
                </Button>
            }
        </div>
    );}


    
}





export function FormRow(props) {

    let rowClass = props.children.props.level % 2 == 0 ? "rjf-form-row col align-items-center my-2" : "rjf-form-row row align-items-center my-2"

    if(props.children.props.level % 2 == 0 && props.children.props.parentType === "array"){rowClass='rjf-form-row row align-items-center my-2'}


    return (
        <div className={rowClass}>
            <FormRowControls {...props} />
            <div className="rjf-form-row-inner col">
                {props.children}
            </div>
        </div>
    );
}


export function FormGroup(props) {
    
      
    
    let hasChildren = React.Children.count(props.children);

    let innerClassName = props.level === 0 && !hasChildren
        ? ""
        : "rjf-form-group-inner row  align-items-center";


    let rowClass = props.level == 0 ? "rjf-form-group row m-1 py-2" : "rjf-form-group col m-1 py-2"


    if (props.schema.type === 'object' && props.level == 1){rowClass = 'rjf-form-group row m-1 py-2'}



    return (
        <div className={rowClass}>
            {props.level === 0 && <GroupTitle>{props.schema.title}</GroupTitle>}
            <div className={innerClassName}>
                {props.level > 0 && <GroupTitle>{props.schema.title}</GroupTitle>}
                {props.children}
                {props.addable && 

                <div className='btn-group group-add col m-1 text-center'>
                    <Button
                        className="add"
                        onClick={(e) => props.onAdd()}
                        title="Add new"
                    >
                        {hasChildren ? 'Add more' : 'Add'}
                    </Button>
                </div> }
            </div>
        </div>
    );
}
