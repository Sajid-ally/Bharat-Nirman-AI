export default function StatCard(
{
    title,
    count,
    growth,
    icon
}
){

return(

<div className="stat-card">

    <div className="icon">
        {icon}
    </div>

    <div>

        <h4>
            {title}
        </h4>

        <h1>
            {count}
        </h1>

        <p>
            {growth}
        </p>

    </div>

</div>

);
}