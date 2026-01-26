export class ResponseError extends Error
{
    /**
     * 
     * @param {string} message 
     * @param {number} status default `500`
     */
    constructor(message, status = 500)
    {
        super(message);
        this.status = status;
    }
}