const express = require("express")
const router = express.Router()

var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

var ec2 = new AWS.EC2();

router.get("/", (req, res) => { 
    res.send("<h1>Welcome to EC2 CRUD</h1>")
})

router.post("/create", (req, res) => {
    const params = {
        ImageId: `${req.body.imgid}`,
        InstanceType: `${req.body.inst}`,
        MinCount: 1,
        MaxCount: 1,
        TagSpecifications: [
            {
                ResourceType: "instance",
                Tags: [
                    {
                        Key: "Name",
                        Value: `${req.body.iname}`
                    }
                ]
            }
        ]
    };

    ec2.runInstances(params, function (err, data) {
        if (err) {
            console.log(err, err.stack); 
            res.send(err)
        } else {
            console.log(data);
            res.send(data)         
        }
    });
})

router.get('/list', (req, res) => {

    var params = {
        DryRun: false
    };

    ec2.describeInstances(params, function (err, data) {
        if (err) {
            console.log("Error", err.stack);
            res.send(err.stack)
        } else {
            console.log("Success", JSON.stringify(data));
            res.send(data);
        }
    });
})

router.get('/state/:state/:id', (req, res) => {
    var params = {
        InstanceIds: [`${req.params.id}`],
        DryRun: true
    };
    let state = `${req.params.state}`
    if (state.toUpperCase() === "START") {
        ec2.startInstances(params, function (err, data) {
            if (err && err.code === 'DryRunOperation') {
                params.DryRun = false;
                ec2.startInstances(params, function (err, data) {
                    if (err) {
                        console.log("Error", err);
                    } else if (data) {
                        console.log("Success", data.StartingInstances);
                        res.send(data.StartingInstances)
                    }
                });
            } else {
                console.log("permission denied");
            }
        });
    } else if (state.toUpperCase() === "STOP") {
        ec2.stopInstances(params, function (err, data) {
            res.send(err);
            if (err && err.code === 'DryRunOperation') {
                params.DryRun = false;
                ec2.stopInstances(params, function (err, data) {
                    if (err) {
                        console.log("Error", err);
                    } else if (data) {
                        console.log("Success", data.StoppingInstances);
                        res.send(data.StoppingInstances)
                    }
                });
            } else {
                console.log("permission denied");
            }
        });
    }
});

router.delete("/terminate/:inst", (req, res) => {
    const params = {
        InstanceIds: [`${req.params.inst}`]
    };

    ec2.terminateInstances(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data);          
        }
    });
})

module.exports = router