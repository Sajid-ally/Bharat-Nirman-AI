export async function getCoordinates(
    address
) {

    try {

        const response =
        await fetch(

`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`

        );

        const data =
        await response.json();

        console.log(
            "Geocoder:",
            data
        );

        if (
            !data ||
            data.length === 0
        ) {
            return null;
        }

        return {

            latitude:
            parseFloat(
                data[0].lat
            ),

            longitude:
            parseFloat(
                data[0].lon
            ),

            display:
            data[0]
            .display_name

        };

    }

    catch (err) {

        console.log(
            "Location Error:",
            err
        );

        return null;
    }
}